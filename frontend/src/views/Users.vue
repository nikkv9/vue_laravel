<template>
  <Header />
  <div>
    <h2>Users data</h2>

    <div class="usersContainer">
      <div class="dataTable">
        <EasyDataTable
          :headers="headers"
          :items="users"
          buttons-pagination
          show-index
          table-class-name="customize-table"
        >
          <template #item-actions="user">
            <div class="actBtnContainer">
              <button @click="deleteUser(user.id)">Delete</button>
              <button @click="openModal(user.id)">Update</button>
            </div>
          </template>
        </EasyDataTable>
      </div>
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>Update User details</v-card-title>
          <div class="updateForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" v-model="formData.name" placeholder="name" />
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="formData.email"
                placeholder="email"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                v-model="formData.password"
                placeholder="password"
              />
            </div>

            <div class="form-group">
              <label>Role</label>
              <select v-model="formData.role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <v-card-actions>
            <v-btn @click="closeModal">Close</v-btn>
            <v-btn @click="updateUser(this.userId)">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="chartContainer">
      <div class="pieChartContainer">
        <h2>User's role</h2>
        <div class="pieChart">
          <UserPieChart :chartData="pieChartData" :chartOpts="pieOpts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/layout/Header.vue";
import Cookies from "js-cookie";
import UserPieChart from "../components/charts/UserPieChart.vue";
export default {
  components: {
    Header,
    UserPieChart,
  },

  data() {
    return {
      users: [],

      dialog: false,
      userId: "",

      formData: {
        name: "",
        email: "",
        password: "",
        role: "",
      },

      token: Cookies.get("tokenId"),

      pieLabels: [],
      pieData: [],

      pieOpts: {
        responsive: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },

      headers: [
        {
          text: "Name",
          value: "name",
          sortable: true,
        },
        {
          text: "Email",
          value: "email",
          sortable: true,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },

  computed: {
    pieChartData() {
      return {
        labels: this.pieLabels,
        datasets: [
          {
            label: "Count",
            data: this.pieData,
            backgroundColor: ["#11ad9e", "#054761"],
            // borderColor: "rgb(66, 66, 66)",
            hoverOffset: 10,
          },
        ],
      };
    },
  },

  methods: {
    async openModal(userId) {
      this.dialog = true;
      this.userId = userId;
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + `/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // console.log(res.data.user);

        this.formData.name = res.data.user.name;
        this.formData.email = res.data.user.email;
        this.formData.password = res.data.user.passwordTxt;
        this.formData.role = res.data.user.role;
      } catch (error) {
        console.log(error);
      }
    },
    closeModal() {
      this.dialog = false;
    },

    async getAllUsers() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + "/users",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(res);
        this.users = res.data.users;

        const roles = res.data.users.map((user) => user.role);

        // counting roles
        const roleCounts = roles.reduce((acc, role) => {
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {});

        // assigning keys and values
        this.pieLabels = Object.keys(roleCounts);
        this.pieData = Object.values(roleCounts);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser(id) {
      try {
        const res = await axios.delete(
          import.meta.env.VITE_API_ENDPOINT + `/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.getAllUsers();
      } catch (error) {
        console.log(error);
      }
    },

    async updateUser(id) {
      try {
        const res = await axios.put(
          import.meta.env.VITE_API_ENDPOINT + `/user/${id}`,
          {
            name: this.formData.name,
            email: this.formData.email,
            password: this.formData.password,
            role: this.formData.role,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      this.userId = "";
      this.getAllUsers();
    },
  },

  mounted() {
    this.getAllUsers();
  },
};
</script>

<style lang="scss" scoped>
.usersContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dataTable {
  width: 50rem;
  margin-top: 2rem;
}
.actBtnContainer button {
  border: 1px solid black;
  padding: 0.3rem 0.7rem;
  margin: 0 0.5rem;
}

.customize-table {
  --easy-table-header-font-size: 1rem;
  --easy-table-body-row-font-size: 0.9rem;
  --easy-table-header-item-padding: 0.2rem 1.5rem;
  --easy-table-body-item-padding: 0.5rem 1.5rem;
}
.updateForm {
  padding: 2rem;
}
.form-group {
  display: flex;
  margin-bottom: 1rem;
}
.form-group label {
  width: 8rem;
}
.form-group input,
.form-group select {
  border: 1px solid gray;
  padding: 0.5rem;
  width: 50%;
}
.chartContainer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.pieChartContainer {
  width: 50%;
  box-shadow: 0 0 0.3rem rgb(0, 0, 0, 0.3);
  padding: 1rem;
}
.pieChart {
  display: flex;
  justify-content: center;
}
</style>
