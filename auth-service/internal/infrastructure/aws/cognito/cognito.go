package cognito

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
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

func (a *CognitoService) SignUp(
	ctx context.Context,
	password, email string,
) (SignUpResponse, error) {

	secretHash := generateSecretHash(
		email,
		os.Getenv("COGNITO_CLIENT_ID"),
		os.Getenv("COGNITO_CLIENT_SECRET"),
	)

	output, err := a.CognitoClient.SignUp(ctx, &cognitoidentityprovider.SignUpInput{
		ClientId:   aws.String(os.Getenv("COGNITO_CLIENT_ID")),
		SecretHash: aws.String(secretHash),
		Username:   aws.String(email),
		Password:   aws.String(password),
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
		return SignUpResponse{}, err
	}

	return SignUpResponse{
		CognitoId: aws.ToString(output.UserSub),
	}, nil
}

func (a *CognitoService) SignIn(ctx context.Context, clientId string, userName string, password string) (*types.AuthenticationResultType, error) {
	var authResult *types.AuthenticationResultType

	secretHash := generateSecretHash(
		userName,
		os.Getenv("COGNITO_CLIENT_ID"),
		os.Getenv("COGNITO_CLIENT_SECRET"),
	)

	output, err := a.CognitoClient.InitiateAuth(ctx, &cognitoidentityprovider.InitiateAuthInput{
		AuthFlow:       "USER_PASSWORD_AUTH",
		ClientId:       aws.String(clientId),
		AuthParameters: map[string]string{"USERNAME": userName, "PASSWORD": password, "SECRET_HASH": secretHash},
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

func generateSecretHash(username, clientID, clientSecret string) string {
	h := hmac.New(sha256.New, []byte(clientSecret))
	h.Write([]byte(username + clientID))
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}
