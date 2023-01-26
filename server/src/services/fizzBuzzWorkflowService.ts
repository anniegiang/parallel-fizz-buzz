import WorkflowService from "./workflowService";
import fizzBuzzWorkflowConfig from "../configs/fizzBuzzWorkflow";

class FizzBuzzWorkflowService extends WorkflowService {
  projectName: string;
  location: string;
  workflow: string;
  lowerLimit: number;
  upperLimit: number;

  constructor() {
    super();
    this.projectName = fizzBuzzWorkflowConfig.projectName;
    this.location = fizzBuzzWorkflowConfig.location;
    this.workflow = fizzBuzzWorkflowConfig.workflow;
    this.lowerLimit = fizzBuzzWorkflowConfig.lowerLimit;
    this.upperLimit = fizzBuzzWorkflowConfig.upperLimit;
  }

  validateInput(input: number) {
    return this.lowerLimit <= input && input <= this.upperLimit;
  }

  async execute(input: number) {
    const execution = await super.createExecution(
      this.projectName,
      this.location,
      this.workflow,
      {input}
    );

    return super.run(execution);
  }
}

export default FizzBuzzWorkflowService;
