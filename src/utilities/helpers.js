export const formatCurrentDate = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

export const hashCode = (str) => {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return hash;
}

export const articlesHeader = [
    { name: "Title", sortable: true },
    { name: "Author", sortable: true },
    { name: "Created At", sortable: true },
    { name: "Descriptions", sortable: true },
    { name: "Actions", sortable: true },
];