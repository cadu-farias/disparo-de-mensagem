<template>
    <main>
      <div class="container">
        <div class="container-fluid">
            <h2>Iniciar Sessão</h2>
            <div class="sessao">
              <label for="nome">Nome da sessão: </label>
              <input class="form-control" placeholder="Nome da sessão" v-model="sessao" type="text">
              <label for="token">Token da sessão: </label>
              <input class="form-control" placeholder="Token gerado" v-model="token" type="text">
              <input @click="iniciarSessao()" type="submit">
            </div>
            <div>
                <h3 v-show="sessaoAtiva">{{alerta}}</h3>
                <h3 v-show="qrcode == null">Inicializando qr code aguarde....</h3>
                <img :src="qrcode" alt="">
            </div>
          </div>
        </div>
    </main>
  </template>
  
  <script>
  import axios from '../utils/axios'
  export default{
      name:"App",
      data() {
        return{
          chave:'CADUSECURETOKEN',
          sessao: '',
          token: '',
          qrcode: false,
          sessaoAtiva: false,
          alerta:''
        }
      },
      methods:{
        async iniciarSessao(){
          await axios.post(`/${this.sessao}/start-session`,{},{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          }).then((data) => {
            console.log(data.data)
          if (data.data.status == "CONNECTED"){
              this.qrcode = false
              this.alerta = "Essa sessão já está conectada!"
              this.sessaoAtiva = true
          }else{
            this.qrcode = data.data.qrcode
          }
          setTimeout(()=>{
            if (this.qrcode == null){
              this.iniciarSessao()
              this.pegarQrCode()
            }if (data.data.status == "CONNECTED"){
              this.qrcode = false
              this.alerta = "Sessão conectada com sucesso!"
              this.sessaoAtiva = true
          }else{
            this.iniciarSessao()
            this.pegarQrCode()
          }
          }, 4000)
          }).catch((e)=>{
            this.alerta = "Essa sessão não existe!"
            this.sessaoAtiva = true
          })
        },
        async pegarQrCode(){
          await axios.get(`/${this.sessao}/status-session`,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          }).then((data)=>{
            console.log(data.data)
            this.qrcode = data.data.qrcode
          })
        }
      }
    }
  </script>
  
  