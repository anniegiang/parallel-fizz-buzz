import WorkflowService from "./workflowService";
import fizzBuzzWorkflowConfig from "../configs/fizzBuzzWorkflow";

class FizzBuzzWorkflowService extends WorkflowService {
  projectName: string;
  location: string;
  workflow: string;

  constructor() {
    super();
    this.projectName = fizzBuzzWorkflowConfig.projectName;
    this.location = fizzBuzzWorkflowConfig.location;
    this.workflow = fizzBuzzWorkflowConfig.workflow;
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
