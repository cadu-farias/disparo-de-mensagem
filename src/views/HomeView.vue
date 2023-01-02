<template>
  <main>
    <div class="container">
      <div class="card-body">
        <h1>
          SEJA BEM VINDO AO <span>CADU BOT</span> - DISPARO DE MENSAGENS EM MASSAS
        </h1>
        <button>COMEÇAR</button>
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
        qrcode: false
      }
    },
    methods:{
     async criarSessao(){
        const { data } = await axios.post(`/${this.sessao}/${this.chave}/generate-token`)
        this.token = data.token
        // guardar token e nome da sessão no banco de dados para listar as sessão ativas
        console.log(this.token)
      },
      async iniciarSessao(){
        const { data } = await axios.post(`/${this.sessao}/start-session`,{},{
          headers:{
            'Authorization': `Bearer ${this.token}`
          }
        })
        this.qrcode = data.qrcode
        console.log(data)
        setTimeout(()=>{
          if (this.qrcode == null){
            this.iniciarSessao()
          }
        }, 4000)
      }
    },
    created(){
  
    }
  }
</script>

<style>
  body{
    background: linear-gradient(90deg, rgba(180,247,247,1) 0%, rgba(41,187,185,1) 35%, rgba(5,159,144,1) 100%);
    color: white;
  }
  .container{
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
  }
  .card-body{
    display: flex;
    max-width: 500px;
    min-width: 300px;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: column;
  }
  .card-body h1 span{
    color: rgb(255, 230, 0);
    
  }
  .card-body h1{
    position: relative;
    animation-name: entrada;
    animation-duration: 2s;
  }
    @keyframes entrada{
      0% {opacity: 0;}
      100%{opacity: 100%;}
    }

  .card-body button {
    cursor: pointer;
    padding: 10px 40px;
    background: rgb(1, 28, 53);
    color: white;
    border: none;
    margin: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
    transition: 0.5s;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.151);
    position: relative;
    animation-name: entrada;
    animation-duration: 2s;
  }
  .card-body button:hover{
    background: rgb(243, 243, 243);
    color:rgb(1, 28, 53);
  }

  @media (max-width: 300px){
    .card-body {
      margin-top: 50px;
    }
  }
</style>