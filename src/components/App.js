import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';



const options = ['good', 'bad', 'neutral'];

 export default function App(){
   const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);
 
   
   const totalCount  = () => {
     return goodFeedback + neutralFeedback + badFeedback;
   } 
  
   const positivePercentage = () => {
     let totalFeed = totalCount();
     return totalFeed ? Math.round((goodFeedback / totalFeed) * 100) : 0;

   };
   

   const hadleLeaveFeedback = ({ target}) => {
     const { feedback } = target.dataset;
     
     switch (feedback) {
       case 'good':
         setGoodFeedback(prevState => prevState + 1);
         break;
       
        case 'neutral':
         setNeutralFeedback(prevState => prevState + 1);
         break;
       
       case 'bad':
         setBadFeedback(prevState => prevState + 1)
         break;
       
           default:
        return;
     }
   }

  return(
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={hadleLeaveFeedback} />
        </Section>

        {totalCount() === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Section title="Statistics">
            <Statistics
              good={goodFeedback}
              neutral={neutralFeedback}
              bad={badFeedback}
              total={totalCount()}
              positivePercentage={positivePercentage()}
            />
          </Section>
        )}
      </>
    );
  
}



// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     const totalFeed = good + neutral + bad;
//     return totalFeed;
//   };

//   countPositivePercentage = () => {
//     const totalFeed = this.countTotalFeedback();
//     const { good } = this.state;
// 		const percentage = (good * 100) / totalFeed;
// 		return Math.round(percentage);
//   };

//   onLeaveFeedback = (e) => {
//     const name = e.target.name;
//     this.setState((prevState) => ({
//       [name]: prevState[name] + 1,
//     }));

//   };
//   render() {
//     const { good, neutral, bad } = this.state;
//     const positivePercentage = this.countPositivePercentage();
//     const total = this.countTotalFeedback();

//     const objKey = Object.keys(this.state);

//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions options={objKey} onLeaveFeedback={this.onLeaveFeedback } />
//         </Section>

//         {total === 0 ? (
//           <Notification message="No feedback given" />
//         ) : (
//           <Section title="Statistics">
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           </Section>
//         )}
//       </>
//     );
//   }
// }

// export default App;
