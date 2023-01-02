<template>
    <main>
      <div class="container">
          <div class="container-base">
              <h1 style="text-align: center;">Lista de sessão</h1>
              <div class="container-linha">
                <div v-for="d in data" :key="d.id" class="lista-sessao">
                  <p class="titulo">{{d.sessao}}</p>
                  <div class="colar">
                      <input type="text" id="myInput" :value="d.token" style="border: none;">
                      <button @click="clipBoard(d.id)">Copiar</button>
                  </div>
                <span>Estado: <strong v-if="d.estado == 'Connected'" style="color: green;">{{ d.estado }}</strong> <strong v-else style="color: red;" >{{ d.estado }}</strong></span>
                  <button @click="apagarSessao(d.id, d.sessao, d.token)" class="btn btn-danger">Deletar</button>
                </div>
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
          qrcode: false,
          data: []
        }
      },
      methods:{
        async apagarSessao(id, sessao, token){
            await firebase.deletar(id)
            const sessaoIndex = this.data.findIndex( (u)=> u.id == id)
            this.data.splice(sessaoIndex, 1)
            await axios.post(`/${sessao}/close-session`,{},{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          })
        },
        clipBoard(){
            const copyText = document.getElementById("myInput");
            copyText.select()
            copyText.setSelectionRange(0, 99999);
            document.execCommand('copy')
        }
        },
        async created(){
         const dados =  await firebase.listar()
         for (let i in dados){
             const { data } = await axios.get(`/${dados[i].sessao}/check-connection-session`,{
                headers:{
                  'Authorization': `Bearer ${dados[i].token}`
                }
              })
              this.data.push({id: dados[i].id,sessao: dados[i].sessao ,token: dados[i].token, estado: data.message})
         }
        }
    }
</script>
  

  