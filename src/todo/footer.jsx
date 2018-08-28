import "../assets/style/footer.styl";
export default {
  data (){
    return {
      name: 'vkcyan'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Writter { this.name }</span>
      </div>
    )
  }
}
