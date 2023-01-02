<template>
    <main>
      <div class="container">
        <div class="container-fluid">
          <h1>Criar Sessão</h1>
          <div class="sessao">
            <label for="nome" >Nome da sessão: </label>
            <input class="form-control" placeholder="  Nome da sessão" v-model="sessao" type="text">
            <input @click="criarSessao()" type="submit">
          </div>
          <p v-show="token != ''">Seu token gerado é: <strong>{{ token }}</strong></p>
          <p v-show="token != ''"><strong >Utilize o token para iniciar uma sessão!</strong> </p>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import axios from '../utils/axios'
  import baseApp from '../utils/firebase'
  const firebase = new baseApp()
  export default{
      name:"App",
      data() {
        return{
          chave:'CADUSECURETOKEN',
          sessao: '',
          token: '',
          qrcode: false
        }
      },
      methods:{
       async criarSessao(){
          const { data } = await axios.post(`/${this.sessao}/${this.chave}/generate-token`)
          this.token = data.token
          // guardar token e nome da sessão no banco de dados para listar as sessão ativas
          const novaSessao = await firebase.create({sessao: this.sessao, token: this.token})
          console.log(novaSessao)
          this.sessao = ''
        }
        },
        async created(){
         const data =  await firebase.listar()
        }
    }
</script>
  

  