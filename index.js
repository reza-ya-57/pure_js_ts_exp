
const Data = [
    {
        id: 1,
        number: 1,
        sampleId: 0,
        caption: "",
        attribute: "{'max':10,'min':2}",
        description: "",
        mandatory: null,
        choiceTypeId: 0,
        sortOrder: 0,
        answered: false,
        display: null,
        noIdea: { id: 101, caption: "میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
        // noIdea: null ,
        choices: {
            values: [
                { id: 201, caption: "در سوال دو دراپ دون 741 حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: true, display: true },
                { id: 202, caption: "یکی از 741 ها در دراپ دون و اینپوت دوم حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: true, display: true },
                { id: 203, caption: "داخل مولتی دراپ دون 602 حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
            ]
        }


    },
    {
        id: 2,
        number: 1,
        sampleId: 0,
        caption: "",
        attribute: "{'max':10,'min':2}",
        description: "",
        mandatory: null,
        choiceTypeId: 0,
        sortOrder: 0,
        answered: false,
        display: null,
        noIdea: { id: 102, caption: "میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
        // noIdea: null ,
        choices: {
            values: [
                { id: 204, caption: "در سوال دو دراپ دون 741 حذف میشود", sortOrder: 12, deletedChoiceIds: "3,", deletedQuestionIds: "3,", status: true, display: true },
                { id: 205, caption: "یکی از 741 ها در دراپ دون و اینپوت دوم حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "32,", status: true, display: true },
                { id: 206, caption: "داخل مولتی دراپ دون 602 حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
            ]
        }


    },
    {
        id: 3,
        number: 1,
        sampleId: 0,
        caption: "",
        attribute: "{'max':10,'min':2}",
        description: "",
        mandatory: null,
        choiceTypeId: 0,
        sortOrder: 0,
        answered: false,
        display: null,
        noIdea: { id: 33, caption: "میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
        // noIdea: null ,
        choices: {
            values: [
                { id: 31, caption: "در سوال دو دراپ دون 741 حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
                { id: 32, caption: "یکی از 741 ها در دراپ دون و اینپوت دوم حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
                { id: 33, caption: "یکی از 741 ها در دراپ دون و اینپوت دوم حذف میشود", sortOrder: 12, deletedChoiceIds: "", deletedQuestionIds: "", status: false, display: true },
            ]
        }


    },
]


const conditions = [
    {
        script: 'Q1(202) and Q2(204 && 205)',
        targetQuestionIds: '3',
        targetChoiceIds: '31,32',
        active: false,
        display: false
    },
    {
        script: 'Q23(34 || 1 || 34) and Q12(25 || 11)',
        targetQuestionIds: '23,12,56',
        targetChoiceIds: '12,11,10',
        active: false,
        display: false
    },
    {
        script: 'Q23(34 || 22) and Q12(45 && 11)',
        targetQuestionIds: '23,12,56',
        targetChoiceIds: '12,11,10',
        active: false,
        display: false
    },
]



const conditionFormatter = (conditions) => {
    return cookedConditions = conditions.map(condition => {
        let str = condition.script.replace(/\s/g, '')
        let conditionUnits = str.split('and')
        let conditionsObject = conditionUnits.map(item => {
            let questionId, choiceIds, operand;
            if (item.match(/Q\d+/)[0]) {
                let questionStringId = item.match(/Q\d+/)[0]
                questionId = parseInt(questionStringId.match(/\d+/))
                let choiceStringId = item.replace(questionStringId, '').slice(1, -1);
                if (choiceStringId.match(/&&/g)) {
                    choiceIds = choiceStringId.split('&&').map(strId => parseInt(strId))
                    operand = '&&'
                }
                else if (choiceStringId.match(/\|\|/g)) {
                    operand = '||'
                    choiceIds = choiceStringId.split('||').map(strId => parseInt(strId))
                }
                else {
                    choiceIds = [parseInt(choiceStringId)]
                    return {
                        questionId: questionId,
                        choiceIds: choiceIds,
                        operand: '&&'
                    }
                }
                return {
                    questionId: questionId,
                    choiceIds: choiceIds,
                    operand: operand
                }

            } else {
                console.log('do not wirte these condition yet')
            }
        })
        return {
            ...condition,
            condition: {
                conditions: conditionsObject,
                conditionsOperand: 'and'
            }
        }

    })
}



const checkEachLogicalCondition = (singleCondition, data) => {
    let resultsArray = []
    data.forEach(question => {
        if (question?.id == singleCondition.questionId) {
            singleCondition?.choiceIds.forEach(id => {
                question?.choices?.values.forEach(choice => {
                    if (choice?.id == id) {
                        resultsArray.push(choice?.status)
                    }
                })
            })
        }
    })

    if (resultsArray.length === 0) return false;

    return resultsArray.reduce((prev, current) => {
        if (singleCondition.operand === '||') {
            return prev || current;
        }
        else if (singleCondition.operand === '&&') {
            return prev && current
        }
    })
}



const checkLogicalCondition = (conditionObj, data) => {
    let conditionStatus = [];
    conditionObj.condition.conditions.forEach(condition => {
        if ((condition.operand === '||') || (condition.operand === '&&')) {
            let status = checkEachLogicalCondition(condition, data)
            conditionStatus.push(status)
        }
    })
    
    if (conditionStatus.length === 0) return false;

    return conditionStatus.reduce((prev, current) => {
        if (conditionObj.condition.conditionsOperand === 'and') {
            return prev && current;
        }
        else if (conditionObj.condition.conditionsOperand === 'or') {
            return prev || current;
        }
    })

}

const resetQuestion = (question) => {
    question.answered = false;
    question?.choices?.values.forEach(choice => {
        choice.status = false;
    })
}

const applyQuestionTargetCondition = (conditionObj, data) => {

    let questionTargetId = conditionObj.targetQuestionIds.split(',').map(id => parseInt(id))
    data.forEach(question => {
        questionTargetId.forEach(id => {
            if (question.id === id) {
                question.display = conditionObj.display;
                if (!conditionObj.display) {
                    resetQuestion(question)
                }
            }
        })
    })
}


const applyChoiceTargetCondition = (conditionObj, data) => {
    console.log(conditionObj)
    let choiceTargetsId = conditionObj?.targetChoiceIds.split(',').map(id => parseInt(id))
    choiceTargetsId.forEach(targetId => {
        data.forEach(question => {
            question?.choices?.values.forEach(choice => {
                if (choice?.id === targetId) {
                    choice.display = conditionObj?.display
                    resetQuestion(question)
                }
            })
        })
    })
}

const applyTargetConditions = (conditionObj, data) => {
    applyQuestionTargetCondition(conditionObj, data);
    applyChoiceTargetCondition(conditionObj, data);
}

// get Each condition object and apply condition to data
const applyConditions = (conditionObj, data) => {
    conditionObjStatus = checkLogicalCondition(conditionObj, data)
    if (conditionObjStatus) {
        applyTargetConditions(conditionObj, data)
    }

}


let formatCondition = conditionFormatter(conditions)

console.log(formatCondition)
formatCondition.forEach(formatedCondition => {
    // debugger
    applyConditions(formatedCondition, Data)
    console.log("/////////////// next")
})

console.log(Data)







