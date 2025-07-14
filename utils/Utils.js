class Utils {

    static capitalize(string) {
        if (!string) return "";
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    };

    static formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });


}

}

export default Utils;
