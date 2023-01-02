<template>
    <main>
      <div class="container">
        <div class="container-fluid">
          <h2>Enviar Mensagem</h2>
          <div class="checkbox" >
              <input  @click="checarImg()" type="checkbox" name="imgon"><span> Gostaria de enviar imagem? - </span>
              <input  @click="checarLink()" type="checkbox" name="linkon"><span>Mandar um link Preview - </span>
              <input  @click="checarMSG()" type="checkbox" name="linkon"><span>Mandar Mensagem de texto - </span>
              <input  @click="checarBTN()" type="checkbox" name="linkon"><span>Mandar Botão de chamada e link</span>
          </div>
            <div class="sessao">
              <label for="nome">*Nome da sessão: </label>
              <input class="form-control" placeholder="Nome da sessão" v-model="sessao" type="text">
              <label for="token">*Token da sessão: </label>
              <input class="form-control" placeholder="Token gerado" v-model="token" type="text">
              <label for="numero">*Numeros dos destinatários : </label>
              <textarea placeholder="Formato 5586123456789" cols="30" rows="5" v-model="msg.phone"></textarea>
              <h2 v-show="checarmsg" >Mensagem de texto</h2>
              <label v-show="checarmsg" for="mensagem">*Mensagem: </label>
              <textarea v-show="checarmsg" cols="30" rows="5" v-model="msg.message"></textarea>
            </div>
            <div class="img">
                <h2 v-show="checked">Enviar Imagem com titulo</h2>
                <label v-show="checked" for="caption">Capiton da imagem: </label>
                <input v-show="checked" class="form-control" placeholder="Capiton da imagem" v-model="img.message" type="text">
                <label v-show="checked" for="caption">Anexar imagem: </label>
                <label v-show="checked" class="picture" for="picture__input" tabindex="0">
                    <span class="picture__image"><img v-if="img.base64 != ''" :src="img.base64" class="picture__img"><strong v-else>ARRASTE A IMAGEM</strong> </span>
                </label>
                <input v-show="checked" id="picture__input" type="file" @input="pegar" accept="image/png, image/jpeg">   
            </div>
            <div class="link">
                <h2 v-show="checarpreview">Enviar Link preview</h2>
                <label v-show="checarpreview" for="caption">Capiton: </label>
                <input v-show="checarpreview" class="form-control" placeholder="Capiton" v-model="link.caption" type="text">
                <label v-show="checarpreview" for="caption">Link: </label>
                <input v-show="checarpreview" class="form-control" placeholder="link do site" v-model="link.url" type="text"> 
              </div> 
            <div class="link">
                <h2 v-show="checarbtn">Enviar Botão de ligar e de link</h2>
                <label v-show="checarbtn" for="caption">Mensagem: </label>
                <input v-show="checarbtn" class="form-control" placeholder="Mensagem" v-model="buttons.message" type="text">
                <label v-show="checarbtn" for="caption">Número para ser enviado: </label>
                <input v-show="checarbtn" class="form-control" placeholder="04186912345678" v-model="buttons.options.buttons[0].phoneNumber" type="text">
                <label v-show="checarbtn" for="caption">Texto do botão: </label>
                <input v-show="checarbtn" class="form-control" placeholder="Ligua-me" v-model="buttons.options.buttons[0].text" type="text"> 
                <label v-show="checarbtn" for="caption">URL: </label>
                <input v-show="checarbtn" class="form-control" placeholder="https://www.cadubot.com.br" v-model="buttons.options.buttons[1].url" type="text"> 
                <label v-show="checarbtn" for="caption">texto do botão: </label>
                <input v-show="checarbtn" class="form-control" placeholder="Site" v-model="buttons.options.buttons[1].text" type="text"> 
                <label v-show="checarbtn" for="caption">Titulo: </label>
                <input v-show="checarbtn" class="form-control" placeholder="Olá boa noite?" v-model="buttons.options.title" type="text"> 
                <label v-show="checarbtn" for="caption">rodapé: </label>
                <input v-show="checarbtn" class="form-control" placeholder="CADU-BOT" v-model="buttons.options.footer" type="text"> 
              </div>
              <div class="link">
                <input  @click="enviarMensagem()" type="submit">
              </div>
            <h3 v-show="sucess" style="margin-bottom: 20px;" >{{ alerta }}</h3>
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
          alerta:'',
          sessaoAtiva: false,
          checked: false,
          checarpreview: false,
          checarmsg:false,
          checarbtn:false,
          sucess:false,
          msg:{
            phone: '',
            message: '',
            isGroup: false
          },
          img:{
            phone:"",
            message: "",
            base64:"",
            isGroup: false
          },
          link:{
            phone:'',   
            url: '',
            caption: ''
          },
          buttons:{
            phone: "",
            message: "",
            options:{
                useTemplateButtons: true,
                buttons: [
                    {
                        id:1,
                        phoneNumber: "",
                        text: ""
                    },
                    {
                      id: 2,
                      url: "",
                      text: ""
                    }
                ],
                title: "",
                footer: ""
            }
          }
        }
      },
      methods:{
       async mensagemTxt(){
          await axios.post(`/${this.sessao}/send-message`,this.msg,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          }).then((data)=>{
            if (data.status == 'success'){
              this.alerta `Mensagem enviada com sucesso para o número ${this.msg.phone}!`
              this.sucess = true
            }
          }).catch((e)=>{
            this.alerta = `${this.sessao} ainda não foi iniciada!`
            this.sucess = true
          })
        },
        async enviarImg(){
          this.img.phone = this.msg.phone
          await axios.post(`/${this.sessao}/send-image`,this.img,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          }).then((data)=>{
            this.alerta `Mensagem enviada com sucesso para o número ${this.msg.phone}!`
            if (data.status == 'success'){
              this.sucess = true
            }
          }).catch((e)=>{
            this.alerta = `${this.sessao} ainda não foi iniciada!`
            this.sucess = true
          })
        },
        async enviarLink(){
          this.link.phone = this.msg.phone
          await axios.post(`/${this.sessao}/send-link-preview`,this.link,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          }).then((data)=>{
            if (data.status == 'success'){
              this.alerta `Mensagem enviada com sucesso para o número ${this.msg.phone}!`
              this.sucess = true
            }
          }).catch((e)=>{
            this.alerta = `${this.sessao} ainda não foi iniciada!`
            this.sucess = true
          })
        },
        async enviarBotao(){
          this.buttons.phone = this.msg.phone
          await axios.post(`/${this.sessao}/send-buttons`,this.buttons,{
            headers:{
              'Authorization': `Bearer ${this.token}`
            }
          }).then((data)=>{
            if (data.status == 'success'){
              this.alerta `Mensagem enviada com sucesso para o número ${this.msg.phone}!`
              this.sucess = true
            }
          }).catch((e)=>{
            this.alerta = `${this.sessao} ainda não foi iniciada!`
            this.sucess = true
          })
        },
        enviarMensagem(){
           const numeros = this.msg.phone.split('\n')
           for (let i in numeros){
            this.msg.phone = numeros[i]
            if (this.checked){
                this.enviarImg()
            }if(this.checarmsg){
                this.mensagemTxt()
            }if(this.checarpreview){
                this.enviarLink()
            }if(this.checarbtn){
              this.enviarBotao()
            }
           }
        },
        checarImg(){
            this.checked = !this.checked
        },
        checarLink(){
            this.checarpreview = !this.checarpreview
        },
        checarMSG(){
            this.checarmsg = !this.checarmsg
        },
        checarBTN(){
          this.checarbtn = !this.checarbtn
        },
        pegar: function (target) {
            const file = target.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.img.base64 = reader.result
            };
        }
      }
    }
  </script>
  