## Prerequisite:

- node
- nvm
- npm / yarn

## How to run application:

- Inside your favorite shell enter

```
$ nvm use
```

This command will trigger nvm to read node version recommended for this project (at least v16.13.0) defined in .nvmrc

- If nvm doesn't have v16.13.0 it will require one more step, if not skip this one

```
$ nvm install v16.13.0
$ nvm use
```

### Run locally

- Run server
- Install all necessary dependencies

```
$ yarn
```

- Run application

```
$ yarn start
```

# Users:
```
buyer username: mvpmatchuser1
buyer password: Mvpmatchuser1!
seller username: mvpmatchuser2
seller password: Mvpmatchuser2!
```

## NOTE
- Since successful registration requires new user on AWS Cognito service, user registration hasn't been done (API exists)
- Also, some others things haven't been done due to lack of time although APIs exist
- Translations should be added
- Migrated to react 18, so useEffect without dependencies works differently, that problem is solved with useDidMount custom hook (should be implemented everywhere)
