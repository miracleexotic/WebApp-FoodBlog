# WebApp - FoodBlog
_Web Application for Food Blog._
## Installation
##### Node.js (v14.17.5) & npm (v9.6.6)
[Download and Install](https://nodejs.org/en/download)
```sh
cd path/to/frontend
npm install
```

##### Golang (version go1.20 windows/amd64)
[Download and Install](https://go.dev/doc/install)
```sh
cd path/to/backend
```
**STEP 1**: Delete `go.mod` and `go.sum` then init your project.
```sh
rm go.mod
rm go.sum
go mod init https://github.com/<your-github-username>/WebApp-FoodBlog
go mod tidy
```
**STEP 2**: re-import library in `*.go` file.
ex. `import "github.com/<your-github-username>/WebApp-FoodBlog/entity"`

---
# Analysis & Design
_For implement Database._
![Image Database Entity](/assets/images/DB-Entity.png "DB-Entity")
---
# Usage
_Open URL in browser: http://localhost:8080_

__Backend__
```sh
go run main.go
```
__Frontend__
```sh
npm start
```

#### Sign In
![Image Sign In](/assets/images/SignIn.png "SIGNIN")
Default Credential
1. Email: cherry.chadchada@gmail.com
    Password: 123456
2. Email: example.example@example.com
    Password: 123456
3. Email: test.test@test.com
    Password: 123456