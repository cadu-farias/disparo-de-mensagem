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
          <div class="grupo-row">
            <div class="metade">
              <h3>Mensagem Preview</h3>
              <div  class="tela">
                <div v-show="msg.message.length > 0 && checked == true" class="msg-text"><span>{{msg.message}}</span></div>
                <div v-show="img.base64 != '' && checked == true" class="msg-url">
                  <img v-if="img.base64 != ''" :src="img.base64" style="max-width: 225px; max-height: 200px;">
                  <span>{{ img.message }}</span>
                </div>
                <div v-show="link.url.length > 0" class="msg-url">
                  <div v-show="link.url.length > 0" class="imagem-logo"><strong>LOGO</strong>
                    <div v-show="link.url.length > 0" class="titulo-url">
                      <span>Titulo do site</span>
                      <span>url do site</span>
                    </div>
                  </div>
                  <strong v-show="link.url.length > 0"  style="color: rgb(0, 195, 255); text-decoration: underline; font-size: 0.7rem;">{{ link.url }}</strong>
                  <span>  {{ link.caption }}</span>
                </div>
                <div v-show="checarbtn" class="msg-url" style="width: 210px;">
                  <span>{{ buttons.options.title.length == 0 ? "Titulo do botão" : buttons.options.title }}</span>
                  <span>{{ buttons.message.length == 0 ? "Mensagem do botão" : buttons.message }}</span>
                  <span style="color: gray;">{{ buttons.options.footer.length == 0 ? "Rodapé" : buttons.options.footer }}</span>
                </div>
                <div v-show="checarbtn" class="button-link">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg> {{ buttons.options.buttons[0].text.length == 0 ? "Ligua-me" : buttons.options.buttons[0].text }}</span>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg> {{ buttons.options.buttons[1].text.length == 0 ? "Site" : buttons.options.buttons[1].text }}</span>
                </div>
              </div>
            </div>
            <div class="grupo-msg">
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
  