<template>
    <h1 class="main-title">CHEZ SISSI</h1>
    <div class="container">
        
    <div class="restaurant">
        <!-- 2 Tables Carrées de 4 Places -->
        <div class="table round" onclick="redirectToOrder(1)">1
            <div class="seat seat-top"></div>
            <div class="seat seat-bottom"></div>
            <div class="seat seat-left"></div>
            <div class="seat seat-right"></div>
        </div>
        <div class="table square" onclick="redirectToOrder(2)">2
            <div class="seat seat-top"></div>
            <div class="seat seat-bottom"></div>
            <div class="seat seat-left"></div>
            <div class="seat seat-right"></div>
        </div>
        <div class="table square" onclick="redirectToOrder(3)">3
            <div class="seat seat-top"></div>
            <div class="seat seat-bottom"></div>
            <div class="seat seat-left"></div>
            <div class="seat seat-right"></div>
        </div>
        <div class="table round" onclick="redirectToOrder(4)">4
            <div class="seat seat-top"></div>
            <div class="seat seat-bottom"></div>
            <div class="seat seat-left"></div>
            <div class="seat seat-right"></div>
        </div>
        <div></div>
        
        <!-- 4 Tables Rectangulaires de 6 Places -->
        <div class="table rectangle" onclick="redirectToOrder(5)">5
            <div class="seat seat-top-left"></div>
            <div class="seat seat-top-right"></div>
            <div class="seat seat-bottom-left"></div>
            <div class="seat seat-bottom-right"></div>
            <div class="seat seat-middle-left"></div>
            <div class="seat seat-middle-right"></div>
        </div>
        <div class="table rectangle" onclick="redirectToOrder(6)">6
            <div class="seat seat-top-left"></div>
            <div class="seat seat-top-right"></div>
            <div class="seat seat-bottom-left"></div>
            <div class="seat seat-bottom-right"></div>
            <div class="seat seat-middle-left"></div>
            <div class="seat seat-middle-right"></div>
        </div>
        <div class="table round" onclick="redirectToOrder(7)">7
            <div class="seat seat-top"></div>
            <div class="seat seat-bottom"></div>
            <div class="seat seat-left"></div>
            <div class="seat seat-right"></div>
        </div>
        <!-- Comptoir -->
        <div class="counter" @click="showCommands()">Comptoir</div>
        <!-- Décorations -->
        <div class="plant plant1"></div>
        <div class="plant plant2"></div>
        <div class="plant plant3"></div>
        <div class="plant plant4"></div>
        <!-- Porte -->
        <div class="door">Porte</div>
        <!-- Fenêtres -->
        <div class="window window1"></div>
        <div class="window window2"></div>


        
    </div>

        <div class="commandes" v-if="commands">
            <h1>Commandes:</h1>
            <ul>
                <li><h3>Table 1 : 0</h3></li>
                <li><h3>Table 2 : 0</h3></li>
                <li><h3>Table 3 : 0</h3></li>
                <li><h3>Table 4 : 0</h3></li>
                <li><h3>Table 5 : 0</h3></li>
                <li><h3>Table 6 : 0</h3></li>
                <li><h3>Table 7 : 0</h3></li>
                <li style="borderTop:1px solid black;"><h2>Total: 0</h2></li>
            </ul>
        </div>
    </div>
</template>

<script setup>

    import {ref} from 'vue'

    const commands = ref(false);

    function showCommands () {
        (commands.value == true) ?  commands.value = false :  commands.value = true;
    } 

    
</script>

<style>

.main-title {
  position: relative;
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  padding: 2rem;
  margin: 0;
  z-index: 1;

  background: url('../assets/images/header.jpg') center/cover no-repeat;
  border-radius: 8px;

  /* Superposition semi-transparente */
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.4); /* noir semi-transparent */

  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container {
    display: flex;
}

.restaurant {
    display: grid;
    grid-template-columns: repeat(4, 250px);
    gap: 30px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    position: relative;
    top: 100px;
}
.table {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9534f;
    color: white;
    font-weight: bold;
    position: relative;
}
.square { border-radius: 10px; }
.round { border-radius: 50%; }
.rectangle { width: 120px; height: 80px; }
.seat {
    width: 20px;
    height: 20px;
    background: #5bc0de;
    position: absolute;
    border-radius: 50%;
}
/* Placement des sièges pour 4 places */
.seat-top { top: -10px; left: 40px; }
.seat-bottom { bottom: -10px; left: 40px; }
.seat-left { left: -10px; top: 40px; }
.seat-right { right: -10px; top: 40px; }
/* Placement des sièges pour 6 places */
.seat-top-left { top: -10px; left: 10px; }
.seat-top-right { top: -10px; right: 10px; }
.seat-bottom-left { bottom: -10px; left: 10px; }
.seat-bottom-right { bottom: -10px; right: 10px; }
.seat-middle-left { left: -10px; top: 30px; }
.seat-middle-right { right: -10px; top: 30px; }
/* Comptoir */
.counter {
    width: 300px;
    height: 60px;
    background: #8B4513;
    color: white;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    border-radius: 5px;
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    cursor: 
}

/* Porte */
.door {
    width: 80px;
    height: 120px;
    background: #654321;
    position: absolute;
    bottom: -140px;
    left: 10%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 120px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
}
/* Fenêtres */
.window {
    width: 60px;
    height: 60px;
    background: #87CEEB;
    position: absolute;
    border: 4px solid #ffffff;
}
.window1 { top: -70px; left: 30px; }
.window2 { top: -70px; right: 30px; }

.commandes {
    padding: 20px;
}

</style>