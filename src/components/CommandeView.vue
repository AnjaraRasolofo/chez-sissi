<template>
    <div>
        <h2>Tables</h2>
        <div v-for="table in tables" :key="table.id">
        <button @click="selectTable(table.id)">
            {{ table.name }}
        </button>
        </div>
    
        <div v-if="selectedTableId">
        <h3>Commandes pour {{ getTableName(selectedTableId) }}</h3>
        <ul>
            <li v-for="cmd in commandes[selectedTableId]" :key="cmd.id">
            {{ cmd.qty }}x {{ cmd.item }}
            </li>
        </ul>
        </div>
    </div>
</template>

<script setup>

    import {ref} from 'vue'

    const tables = ref([
      { id: 1, name: 'Table 1' },
      { id: 2, name: 'Table 2' },
    ]);

    const commandes = ref({
      1: [ // Table 1
        { id: 101, item: 'Pizza', qty: 1 },
        { id: 102, item: 'Coca', qty: 2 }
      ],
      2: [ // Table 2
        { id: 201, item: 'Burger', qty: 1 }
      ]
    });

    const selectedTableId = ref();

  function selectTable(id) {
     selectedTableId.value = id;
  }

  function getTableName(id) {
    
    const table = tables.value.find(t => t.id === id);
    return table ? table.name : '';
  }

</script>

  
