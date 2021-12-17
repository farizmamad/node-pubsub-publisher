# Node Project with Google Cloud Pub/Sub as Publisher

Clone this repo for publisher and [that](https://github.com/farizmamad/node-pubsub-subscriber) repo for subscriber. Then follow the instructions.

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
gcloud config region set-value any-region-that-fit-the-project
```

## Build and store image to container registry
```bash
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME
```

then go to ```Google Cloud Run Console```
https://console.cloud.google.com/gcr/images/$PROJECT_ID?authuser=1&project=$PROJECT_ID&supportedpurview=project

## Deploy to Cloud Run

then choose the image. On the latest one, click the ```triple dot button``` on the right. Click ```Deploy to Cloud Run```. Make sure you set the ```number of instances``` as required by your project. In learning phase, 1 is suggested.

Wait for seconds, then the cloud run app should be up. 

At the console, go to ```Cloud Run```. Click on the ```name``` = $SERVICE_NAME. After the service page is opened, you will see ```url``` variable next to the ```region```. Copy that URL and paste that link on the API UI like Postman. Test by sending POST request to endpoint ```/lab-report``` to check if it works. Success request should be responded by ```204```.

At this point, the publisher service has successfully deployed to Cloud Run and working as expected. However, the message sent to the Pub/Sub is failed because the topic has not been created.

## Create the Pub/Sub topic

Go to ```Google Cloud Console Pub/Sub``` https://console.cloud.google.com/cloudpubsub/topic/list?referrer=search&authuser=1&project=$PROJECT_ID&supportedpurview=project

Click ```Create Topic button``` on the top of the page. Write down the ```topic ID```. Then click ```Create Topic``` button to submit and save it.

To be able to publish message to the topic, the publisher service must have the rights to publish message to Pub/Sub specified by its role. Thus, a service account is needed with role Pub/Sub Publisher.

## Create Service Account with role Pub/Sub Publisher

Go to ```Google Cloud IAM & Admin > Service Accounts``` https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=1&project=$PROJECT_ID&supportedpurview=project. Click ```Create Service Account``` button.

Write down service account name. In this case name ```pubsub-publisher``` is suggested to make it clear what is its role. Click ```create and continue```.

Then, add new role. On the dropdown, select ```Pub/Sub > Pub/Sub Publisher```. Nothing to do anymore, so click ```Done``` button.

## Create JSON Key of from the Pub/Sub Publisher Service Account

On the ```Service Accounts``` page, select ```pubsub-publisher```. On the top, click ```KEYS``` tab. Click ```Add Key```, and select ```JSON```. It will then automatically download a .json file containing private key.

From your machine, move the .json file to the project directory. After that, rename the file to ```key.json``` *IMPORTANT!!!*

Next, redo [build](#build-and-store-image-to-container-registry). Then go to ```Google Cloud Run Console```
https://console.cloud.google.com/gcr/images/$PROJECT_ID?authuser=1&project=$PROJECT_ID&supportedpurview=project. 

Select the service where its name = $SERVICE_NAME. Then, click the ```Edit & Deploy New Version```. On that page, go straight to ```Deploy``` button. The service will be deployed with the latest version of image.

---

Until this step, we are finish with the publisher service. You may continue to the subscriber service which can be found [here](https://github.com/farizmamad/node-pubsub-subscriber)
