class CatShopApi {
    constructor({ baseUrl }) {
      this.baseUrl = baseUrl
      this.token = ''
    }
  
    getAuthorizationHeader() {
      return `Bearer ${this.token}`
    }
  
    setToken(token) {
      this.token = token
    }
  
    async checkToken() {
      // if (!this.token) console.log('Отсутствует токен')
      if (!this.token) throw new Error('Отсутствует токен')
  
      const res = await fetch(`${this.baseUrl}/v2/sm9/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: this.getAuthorizationHeader(),
        },
      })
  
      if (res.status === 400) {
        throw new Error('Токен не передан или передан не в том формате')
      }
      if (res.status === 401) {
        throw new Error('Переданный токен некорректен')
      }
    }
  
    async signIn(values) {
      const res = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
  
      if (res.status === 401) {
        throw new Error('Неверные логин или пароль')
      }
      if (res.status === 404) {
        throw new Error('Пользователь с указанным email не найден')
      }
      if (res.status >= 300) {
        throw new Error(`Ошибка, код ${res.status}`)
      }
  
      return res.json()
    }
  
    async signUp(values) {
      const res = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
  
      if (res.status === 400) {
        throw new Error('Некорректно заполнено одно из полей')
      }
  
      if (res.status === 409) {
        throw new Error('Пользователь с указанным email уже существует')
      }
      if (res.status >= 300) {
        throw new Error(`Ошибка, код ${res.status}`)
      }
  
      return res.json()
    }
  
    async getUser() {
      this.checkToken()
      const res = await fetch(`${this.baseUrl}/v2/sm9/users/me`, {
        headers: {
          authorization: this.getAuthorizationHeader(),
        },
      })
  
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
        Проверьте отправляемые данные. Status: ${res.status}`)
      }
  
      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
        Попробуйте сделать запрос позже. Status: ${res.status}`)
      }
  
      if (res.status >= 300) {
        throw new Error(`Ошибка, код ${res.status}`)
      }
  
      return res.json()
    }
  
    async getAllProducts() {
      this.checkToken()
  
      const res = await fetch(`${this.baseUrl}/products`, {
        headers: {
          authorization: this.getAuthorizationHeader(),
        },
      })
  
      if (res.status === 401) {
        throw new Error('Ошибка авторизации')
      }
  
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
        Проверьте отправляемые данные. Status: ${res.status}`)
      }
  
      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
        Попробуйте сделать запрос позже. Status: ${res.status}`)
      }
  
      return res.json()
    }
  
    async getProductById(productId) {
      this.checkToken()
  
      const res = await fetch(`${this.baseUrl}/products/${productId}`, {
        headers: {
          authorization: this.getAuthorizationHeader(),
        },
      })
  
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
        Проверьте отправляемые данные. Status: ${res.status}`)
      }
  
      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
        Попробуйте сделать запрос позже. Status: ${res.status}`)
      }
  
      return res.json()
    }
  }
  
  export const CatShopApi = new CatShopApi({ baseUrl: 'https://api.react-learning.ru' })