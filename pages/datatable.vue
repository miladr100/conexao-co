<template>
    <v-row>
        <data-table></data-table>
    </v-row>
</template>

<script>
import DataTableComponent from "vue-materialize-datatable";

export default {
  name: 'Datatable',
  components: {
      "data-table": DataTableComponent,
  },
  data() {
    return { }
  }
}
</script>
