<template>
    <div class="History">
        <div class="History_Element" v-for="(workplace, i) in history" :key="i">
            <h5 class="History_Date">{{workplace.startmonth}}<br>{{workplace.startyear}}</h5>
            <div class="History_MainBlock">
                <h3 class="History_Title">{{workplace.title}}</h3>
                <a v-if="workplace.link" :href="workplace.link">
                    <h3 class="History_Workplace">{{workplace.workplace}}</h3>
                </a>
                <h3 v-if="!workplace.link" class="History_Workplace">{{workplace.workplace}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            history: [
                {
                    title: "Software Development Tutor",
                    workplace: "Think Table",
                    link: "https://www.facebook.com/tutorreactive/",
                    startmonth: "Feb",
                    startyear: "2016"
                },
                {
                    title: "Junior Frontend Dev",
                    workplace: "Pacific Magazines",
                    link: "http://www.pacificmags.com.au/",
                    startmonth: "Jul",
                    startyear: "2018"
                },
                {
                    title: "Junior Creative Technologist",
                    workplace: "Help me find what's next?",
                    startmonth: "TBD",
                    startyear: "2019"
                }
            ]
        }
    }
}
</script>

