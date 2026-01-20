package s3

import (
	"context"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	v4 "github.com/aws/aws-sdk-go-v2/aws/signer/v4"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Service struct {
	S3Client      *s3.Client
	S3Manager     *manager.Uploader
	PresignClient *s3.PresignClient
}

func NewS3Service(s3Client *s3.Client) *S3Service {
	return &S3Service{
		S3Client:      s3Client,
		S3Manager:     manager.NewUploader(s3Client),
		PresignClient: s3.NewPresignClient(s3Client),
	}
}

func (presigner *S3Service) PutObject(
	ctx context.Context, bucketName string, objectKey string, lifetimeSecs int64) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignPutObject(
		ctx,
		&s3.PutObjectInput{
			Bucket:      aws.String(bucketName),
			Key:         aws.String(objectKey),
			ContentType: aws.String("image/jpeg"),
		},
		func(opts *s3.PresignOptions) {
			opts.Expires = time.Duration(lifetimeSecs) * time.Second
		},
	)

	if err != nil {
		log.Printf("Couldn't get a presigned request to put %v:%v. Here's why: %v\n",
			bucketName, objectKey, err)
	}
	return request, err
}
