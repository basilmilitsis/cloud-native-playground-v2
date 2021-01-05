# cloud-native-playground-v2
A little playground to experiment with some cloud tech

---

## local-stack

#### To run local-stack:
- `npm run start` to start
  - Creates a shared postgres DB
    - db - http://localhost:5432/
    - pgadmin4 - http://localhost:8081/


#### To stop local-stack
- `npm run start` to tear it down

---

## Adding your own (postgres backed) APIs
- `build api pg create ${apiName} ${portNum}`
  - Generates new folder in `apis/${apiName}`
  - Follow `README.MD` instructions in generated folder

---