const addZero = (num) => (String(num).length < 2 ? `0${num}` : num);

export const getDateTime = (hh, mm, ss) => {
    return `${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
};
