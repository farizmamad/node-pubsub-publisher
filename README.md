# Node Project with Google Cloud Pub/Sub as Publisher

Clone this repo then follow the instructions.

# Instructions

open terminal/command line.

## Define variables
```bash
$ PROJECT_ID=my-gcp-project-id
$ SERVICE_NAME=my-service-name
```

## Set gcloud config values
```bash
# set project
gcloud config project set-value $PROJECT_ID

# set region
gcloud config region set-value asia-southeast2
```

## Build container registry and Deploy to Cloud Run
```bash
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME
```

then go to Google Cloud Run Console
https://console.cloud.google.com/gcr/images/$PROJECT_ID?authuser=1&project=$PROJECT_ID&supportedpurview=project

then choose the image. On the latest one, click the triple dot button on the right. Click 'Deploy to Cloud Run'.

Wait for seconds, then the cloud run app should be up.

# Create the Pub/Sub topic

Go to Google Cloud Console Pub/Sub https://console.cloud.google.com/cloudpubsub/topic/list?referrer=search&authuser=1&project=$PROJECT_ID&supportedpurview=project

Click "Create Topic". Write down the topic ID. Then click "Create Topic" button.

