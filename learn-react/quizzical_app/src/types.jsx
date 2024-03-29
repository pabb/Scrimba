// Quiz configuration constants
// Note that these depend on the API configuration generated by OTDB
// https://opentdb.com/api_config.php

const types = {
    QUESTION_COUNT: 5,
    QUESTION_CATEGORY: "",
    QUESTION_DIFFICULTY: "",

    // Question type: true/false, multiple choice, or both
    QUESTION_TYPE_TF: "boolean",
    QUESTION_TYPE_MC: "multiple",
    QUESTION_TYPE_ALL: "",

    ANSWER_TRUE: "True",
    ANSWER_FALSE: "False",

    // API format
    // e.g. https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple
    API_BASE: "https://opentdb.com/api.php?",
    API_PARAMS: {
        amount: "", // 1-50 inclusive
        category: "", // 9-32 inclusive, or null (All)
        difficulty: "", // easy | medium | hard, or null (All)
        type: "" // multiple | boolean, or null (All)
    },

    API_URL: "https://opentdb.com/api.php?amount=5"
}

export default types;