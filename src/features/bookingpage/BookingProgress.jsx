import { ProgressSteps, Step } from './Styles';

function BookingProgress({ activeStep, setActiveStep }) {
  return (
    <ProgressSteps>
      {['Dates', 'Cabin', 'Details', 'Confirm'].map((label, index) => (
        <Step key={label} active={activeStep >= index + 1} onClick={() => setActiveStep(index + 1)}>
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{label}</div>
        </Step>
      ))}
    </ProgressSteps>
  );
}

export default BookingProgress;
