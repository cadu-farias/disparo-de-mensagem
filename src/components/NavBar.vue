<template>
    <header>
        <nav>
            <router-link class="logo" to="/">Cadu Bot</router-link>
            <div @click="abrirNavBar()" class="mobile-menu">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
            <ul @click="abrirNavBar()" :class="menu">
                <li>
                    <router-link to="/">Inicio</router-link>
                </li>
                <li>
                    <router-link to="/criar-sessao">Criar Sessão</router-link>
                </li>
                <li>
                    <router-link to="/iniciar-sessao">Iniciar Sessão</router-link>
                </li>
                <li>
                    <router-link to="/lista-sessao">Listar sessao</router-link>
                </li>
                <li>
                    <router-link to="/enviar-mensagem">Enviar Mensagem</router-link>
                </li>
            </ul>
        </nav>
    </header>

</template>
  
<script>
    export default {
        name:'NavBar',
        data(){
            return{
                menu: 'nav-list'
            }
        },
        methods:{
            abrirNavBar(){
                this.menu == 'nav-list' ? this.menu = 'nav-list active' : this.menu = 'nav-list'
            }
        }
    }
</script>
