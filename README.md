# opa-ms-sample
This repository contains the code for sample application created for explaining the use of OPA for microservices authorisation.

# Deploying on Minikube

The example can be deployed on minikube by using the pre-compiled images on docker hub and the `deployment\cpq.yaml` file.
You should have `minikube` and `kubectl` installed on your machine before running this example.

1. Start the minikube cluster using
```minikube start```

2. Clone the repo at a convenient path <REPO_PATH>
  
3. Swith the directory to the cloned repo
```cd <REPO_PATH>/opa-ms-example```

4. Deploy the application using 
```kubectl apply -f deployment/cpq.yaml```

5. Check if all the pods are up and running
```kubectl get pods```

```
NAME                             READY   STATUS    RESTARTS   AGE
authorization-785794bff5-vxqgj   2/2     Running   0          56m
customer-5fb899fb9d-986m7        1/1     Running   0          56m
offer-654cb448b8-sk8q4           1/1     Running   0          56m
ui-6f87bb9f4-94zpt               1/1     Running   0          56m
```
6. Get the URL for accessing application using ```minikube service ui --url```. The sample output can be like ```http://192.168.64.3:32306```

7. Open a browser and past the URL above to navigate to the application.

8. At first, you will not see any offers listed, and if you try  `Create Offer`, the operation will fail. This is because the authorisation is not set yet.

9. To add the authorisation, first set the SERVICE_URL using ```export SERVICE_URL=`minikube service ui --url` ```
And then, update the policy using 

```
curl -X PUT --data-binary @policies/httpapi.authz.rego \
$SERVICE_URL/authorization/v1/policies/httpapi/authz
```

