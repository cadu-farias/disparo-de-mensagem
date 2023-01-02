<template>
  <div class="about">
    <h1>Sobre</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi magni, ut animi ad mollitia inventore voluptatum tempora, eos assumenda unde fugiat nihil debitis possimus iusto, ratione voluptate! Natus, neque corporis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis tempora commodi inventore eum. Doloremque, aspernatur. Vitae hic aliquid consectetur alias eligendi vero? Totam alias est, incidunt sit dolore nesciunt necessitatibus!</p>
    <picture>
      <source media="(max-width: 600px)" srcset="https://colmeia.me/wp-content/uploads/2022/01/Entrando-na-conversa-como-criar-chatbots-bons-de-papo-1024x576.png">
      <img src="http://www.take.net/blog/wp-content/uploads/2022/07/whatsapp_banner_123-1024x293.png" alt="">
    </picture>
  </div>
</template>

<style>
.about{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.about h1{
  text-align: center;
}
.about p {
  text-align: justify;
  margin: 10px;
  color: black;
  font-size: 1.1em;
  font-stretch: 1.1em;
}
.about picture img {
  width: 100%;
}
</style>
