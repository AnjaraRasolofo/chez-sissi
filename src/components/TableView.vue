<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Plan de salle du restaurant</h1>

    <div class="flex gap-10">
      <!-- Colonne 1 : Rectangles -->
      <div class="w-1/2">
        <h2 class="text-xl font-semibold mb-4 text-center">Tables Rectangles</h2>
        <div class="grid grid-cols-2 gap-6 justify-items-center">
          <div
            v-for="table in rectangleTables"
            :key="table.id"
            class="table-container"
          >
            <div class="chair top-chair"></div>
            <div class="chair right-chair"></div>
            <div class="chair bottom-chair"></div>
            <div class="chair left-chair"></div>

            <div
              class="table flex items-center justify-center text-white font-semibold cursor-pointer rectangle"
              :style="{ backgroundColor: getColor(table.status) }"
              @click="toggleTableStatus(table.id)"
            >
              Table {{ table.number }}
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne 2 : Rondes -->
      <div class="w-1/2">
        <h2 class="text-xl font-semibold mb-4 text-center">Tables Rondes</h2>
        <div class="grid grid-cols-2 gap-6 justify-items-center">
          <div
            v-for="table in roundTables"
            :key="table.id"
            class="table-container"
          >
            <div class="chair top-chair"></div>
            <div class="chair right-chair"></div>
            <div class="chair bottom-chair"></div>
            <div class="chair left-chair"></div>

            <div
              class="table flex items-center justify-center text-white font-semibold cursor-pointer rond"
              :style="{ backgroundColor: getColor(table.status) }"
              @click="toggleTableStatus(table.id)"
            >
              Table {{ table.number }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  
  <script setup>

  import {ref, computed} from 'vue'

  const tables = ref([
          { id: 1, number: 1, status: 'libre', shape: 'rectangle' },
          { id: 2, number: 2, status: 'occupée', shape: 'rond' },
          { id: 3, number: 3, status: 'libre', shape: 'rectangle' },
          { id: 4, number: 4, status: 'réservée', shape : 'rond' },
          { id: 5, number: 5, status: 'libre', shape: 'rectangle' },
          { id: 6, number: 6, status: 'occupée', shape: 'rond' },
          { id: 7, number: 7, status: 'libre', shape: 'rectangle' },
          { id: 8, number: 8, status: 'réservée', shape: 'rond' }
        ]);


      const rectangleTables = computed(() => tables.value.filter(t => t.shape === 'rectangle'))
      const roundTables = computed(() => tables.value.filter(t => t.shape === 'rond'))


    const toggleTableStatus = (id) => {
        const table = tables.value.find(t => t.id === id);
        if (!table) return;
        const next = {
          'libre': 'occupée',
          'occupée': 'réservée',
          'réservée': 'libre'
        };
        table.status = next[table.status];
    }

    const getTableClass = (tables) => {
        switch (tables.status) {
          case 'libre': return 'bg-green-100 text-green-800';
          case 'occupée': return 'bg-red-100 text-red-800';
          case 'réservée': return 'bg-yellow-100 text-yellow-800';
          default: return 'bg-gray-100';
        }
    }

    const getColor = (status) => {
      switch (status) {
        case 'libre':
          return '#10B981' // vert
        case 'occupée':
          return '#EF4444' // rouge
        case 'réservée':
          return '#F59E0B' // jaune
        default:
          return '#9CA3AF' // gris
      }
    }

  </script>
  
  <style scoped>

.table-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.table {
  width: 100%;
  height: 100%;
}

.rectangle {
  border-radius: 10px;
}

.rond {
  border-radius: 50%;
}

.chair {
  width: 18px;
  height: 18px;
  background-color: #374151;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
}

.top-chair {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.right-chair {
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
}

.bottom-chair {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.left-chair {
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
}

  </style>
  