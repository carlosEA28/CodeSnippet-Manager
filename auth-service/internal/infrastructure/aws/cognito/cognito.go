package cognito

import (
	"context"
	"errors"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
)

type CognitoService struct {
	CognitoClient *cognitoidentityprovider.Client
}

type SignUpResponse struct {
	CognitoId string
}

func NewCognitoAction(c *cognitoidentityprovider.Client) *CognitoService {
	return &CognitoService{
		CognitoClient: c,
	}
}

func (a *CognitoService) SignUp(ctx context.Context, password, email string) (SignUpResponse, error) {

	output, err := a.CognitoClient.SignUp(ctx, &cognitoidentityprovider.SignUpInput{
		ClientId: aws.String(os.Getenv("COGNITO_CLIENT_ID")),
		Password: aws.String(password),
		Username: aws.String(email),
		UserAttributes: []types.AttributeType{
			{Name: aws.String("email"), Value: aws.String(email)},
		},
	})

	if err != nil {
		var invalidPassword *types.InvalidPasswordException
		if errors.As(err, &invalidPassword) {
			log.Println(*invalidPassword.Message)
		} else {
			log.Printf("Couldn't sign up user %v. Here's why: %v\n", email, err)
		}
	}

	return SignUpResponse{
		CognitoId: *output.UserSub,
	}, nil
}

func (a *CognitoService) SignIn(ctx context.Context, clientId string, userName string, password string) (*types.AuthenticationResultType, error) {
	var authResult *types.AuthenticationResultType

	output, err := a.CognitoClient.InitiateAuth(ctx, &cognitoidentityprovider.InitiateAuthInput{
		AuthFlow:       "USER_PASSWORD_AUTH",
		ClientId:       aws.String(clientId),
		AuthParameters: map[string]string{"USERNAME": userName, "PASSWORD": password},
	})

	if err != nil {
		var resetRequired *types.PasswordResetRequiredException
		if errors.As(err, &resetRequired) {
			log.Println(*resetRequired.Message)
		} else {
			log.Printf("Couldn't sign in user %v. Here's why: %v\n", userName, err)
		}
	} else {
		authResult = output.AuthenticationResult

	}
	return authResult, err
}
