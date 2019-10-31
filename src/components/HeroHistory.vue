<template>
  <div class="History">
    <div
      v-for="(workplace, i) in history" 
      :key="i"
      class="History_Element">
      <h5
        v-if="i < history.length - 1"
        class="History_Date">
        {{ workplace.startmonth }}
        <br>
        {{ workplace.startyear }}
      </h5>
      <h5
        v-if="i >= history.length - 1"
        class="History_Date">
        TBD<br>{{ new Date().getYear() }}
      </h5>
      <div class="History_MainBlock">
        <h3 class="History_Title">
          {{ workplace.title }}
        </h3>
        <a
          v-if="workplace.link"
          :href="workplace.link">
          <h3 class="History_Workplace">
            {{ workplace.workplace }}
          </h3>
        </a>
        <h3
          v-if="!workplace.link"
          class="History_Workplace">
          {{ workplace.workplace }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import DateFormatter from '~/helpers/DateFormatter';
export default {
    data: function() {
        return {
            dateFormatter: DateFormatter,
            history: [
                {
                    title: "Software Development Tutor",
                    workplace: "Think Table",
                    link: "https://www.facebook.com/tutorreactive/",
                    startmonth: "FEB",
                    startyear: "2016",
                },
                {
                    title: "Junior Frontend Dev",
                    workplace: "Pacific Magazines",
                    link: "http://www.pacificmags.com.au/",
                    startmonth: "JUN",
                    startyear: "2018",
                },
                {
                    title: "Junior Creative Technologist",
                    workplace: "Help me find what's next?",
                    startmonth: "TBD",
                    startyear: "2019",
                }
            ]
        }
    }
}
</script>

