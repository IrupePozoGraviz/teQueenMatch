import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  { id: 1,
    questionText: 'Vad heter Sköldpadda på spanska? ¿Como se llama 🐢 en castellano? ',
    options: ['Tortuga', 'Tartaruga', 'Tortue', 'Schildkröte'],
    correctAnswerIndex: 0,
    animation: 'https://assets5.lottiefiles.com/packages/lf20_gn57ndas.json' },
  { id: 2,
    questionText: 'Vad heter hund på spanska? ¿Como se llama 🐶 en castellano? ',
    options: ['Cao', 'Koira', 'Perro', 'Chien'],
    correctAnswerIndex: 2,
    animation: 'https://assets8.lottiefiles.com/packages/lf20_syqnfe7c.json' },
  { id: 3,
    questionText: 'Vad heter Björn på spanska? ¿Como se llama 🐻 en castellano?',
    options: ['Orso', 'Bjørn', 'Oso', 'Bear'],
    correctAnswerIndex: 2,
    animation: 'https://assets7.lottiefiles.com/packages/lf20_C85CKF0XNW.json' },
  { id: 4,
    questionText: 'Vad heter Giraff på spanska? ¿Como se llama 🦒 en castellano? ',
    options: ['Twiga', 'Giraffe', 'Musumbu', 'Jirafa'],
    correctAnswerIndex: 3,
    animation: 'https://assets7.lottiefiles.com/packages/lf20_whwrxcwy.json' },
  { id: 5,
    questionText: 'Vad heter Haj på spanska? ¿Como se llama 🦈 en castellano? ',
    options: ['Kururu', 'Tiburon', 'Hualaihue', 'Haai'],
    correctAnswerIndex: 1,
    animation: 'https://assets3.lottiefiles.com/animated_stickers/lf_tgs_iphcyng1.json' }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
