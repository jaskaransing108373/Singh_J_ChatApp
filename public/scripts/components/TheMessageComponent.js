export default {
    props: ['msg'],
    template:
        `
    <article>
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h1></h1>
        <h4>{{msg.message.name}} says:</h4>
        <p>{{msg.message.content}}</p>
    </article>
    `,

    data: function () {
        return {
            message: 'hello',
            matchedID: this.$parent.socketID == this.msg.id
        }
    }
}