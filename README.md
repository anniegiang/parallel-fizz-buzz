# Fizz Buzz Cloud Challenge
https://parallellearning.notion.site/Fizz-Buzz-Cloud-Challenge-9176f02a38f54338bb75f3e720a76f2e

## Local setup
### Pre-reqs
- npm
- node
- You have access to run the `fizzbuzz-workflow` that lives in GCP from Annie's account. Send Annie your email know if you need access.
- gcloud CLI (optional)

#### Steps
1. Clone the repo.
```
$ git clone https://github.com/anniegiang/parallel-fizz-buzz.git
```

2. Setup and start the backend server.
```
parallel-fizz-buzz/server $ npm install
parallel-fizz-buzz/server $ npm run start

// you should see: Server running on port 8000
```

2. In another tab, setup and start the web server.
```
parallel-fizz-buzz/web-client $ npm install
parallel-fizz-buzz/web-client $ npm run start

// in the browser open http://localhost:3000/home
```

## Deploying cloud functions to GCP
Please refer to the [official docs](https://cloud.google.com/functions/docs/tutorials/workflows).

Example of how to deploy the `check-fizz-service` from `parallel-fizz-buzz/fizz-service`:
```
parallel-fizz-buzz/fizz-service $ npm install
parallel-fizz-buzz/fizz-service $ gcloud functions deploy check-fizz-service \
--gen2 \
--runtime nodejs18 \
--region=us-west2 \
--entry-point=checkFizz \
--trigger-http \
--allow-unauthenticated
```

## Deploying a workflow to GCP
Please refer to the [official docs](https://cloud.google.com/functions/docs/tutorials/workflows).

How to deploy `fizz-buzz-workflow.yaml` from `parallel-fizz-buzz/workflows`:
```
parallel-fizz-buzz/workflows $ gcloud workflows deploy fizzbuzz-workflow --source=fizz-buzz-workflow.yaml
```

## Troubleshoot
### Unable to run the `fizzbuzz-workflow` in the web app
Please make sure Annie has given you access to run the workflow. If you have access, please confirm whether you are logged in locally to your GCP account and have this file:
```
.config/gcloud/application_default_credentials.json
```

If you don't have that file, try the following:
```
$ gcloud auth application-default login

// you should see this:

Credentials saved to file: [/Users/anniegiang/.config/gcloud/application_default_credentials.json]

These credentials will be used by any library that requests Application Default Credentials (ADC).
```

## Preview
<img width="1716" alt="Screenshot 2023-01-26 at 5 19 49 PM" src="https://user-images.githubusercontent.com/42228386/215010961-fb8e76df-8d3c-475c-a250-e12f92bf7d7e.png">


https://user-images.githubusercontent.com/42228386/215011056-0c18b101-9a71-4e41-ab80-a4520deeda15.mov

![Screenshot 2023-01-26 at 8 58 24 PM](https://user-images.githubusercontent.com/42228386/215012770-32f50cf8-1dd4-4d0a-87a7-e75db5c19354.png)

![Screenshot 2023-01-26 at 8 42 55 PM](https://user-images.githubusercontent.com/42228386/215012721-c40e547f-6f9d-4644-85c0-e240334de059.png)
