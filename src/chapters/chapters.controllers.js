const uuid = require("uuid");

const chaptersDB = require("./chaptersDB");

const getChaptersByProgram = programID => {
    const data = chaptersDB.filter(chapter => chapter.program_id === programID);
    return data;
};

const getChapterById = id => {
    const data = chaptersDB.filter(chapter => chapter.id === id);
    return data.length ? data.at(0) : false;
};

const createChapter = (data, program_id) => {
    const newChapter = {
        id: uuid.v4(),
        program_id,
        chapter_num: data.chapter_num,
        url: data.url ? data.url : "",
    };
    chaptersDB.push(newChapter);
    return newChapter;
};

const deleteChapter = id => {
    const index = chaptersDB.findIndex(chapter => chapter.id === id);
    if (index !== -1) {
        chaptersDB.splice(index, 1);
        return true;
    }
    return false;
};

const editChapter = (id, data) => {
    const index = chaptersDB.findIndex(chapter => chapter.id === id);

    if (index !== -1) {
        const editedChapter = {
            id: id,
            program_id: data.program_id
                ? data.program_id
                : chaptersDB[index].program_id,
            chapter_num: data.chapter_num
                ? data.chapter_num
                : chaptersDB[index].chapter_num,
            url: data.url ? data.url : chaptersDB[index].url,
        };
        chaptersDB[index] = editedChapter;
        return chaptersDB[index];
    }
    return false;
};

const editChapterMedia = (chapterID, mediaUrl) => {
    const index = chaptersDB.findIndex(chapter => chapter.id === chapterID);
    if (index !== -1) {
        chaptersDB[index].url = mediaUrl;
        return chaptersDB[index];
    }
    return false;
};

module.exports = {
    getChaptersByProgram,
    createChapter,
    getChapterById,
    editChapter,
    deleteChapter,
    editChapterMedia,
};
