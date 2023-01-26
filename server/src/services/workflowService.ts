import {ExecutionsClient} from "@google-cloud/workflows";
import sleep from "../utils/sleep";
import {EXECUTION_STATES} from "../constants/workflows";
import Logger from "../middleware/logger";

class WorkflowService extends Logger {
  client: ExecutionsClient;
  backoffDelay: number;

  constructor() {
    super();
    this.client = new ExecutionsClient();
    this.backoffDelay = 1000;
  }

  createExecution(
    projectName: string,
    location: string,
    workflow: string,
    workflowArgs?: any
  ) {
    return this.client.createExecution({
      parent: this.getWorkflowPath(projectName, location, workflow),
      execution: {
        argument: JSON.stringify(workflowArgs),
      },
    });
  }

  async run(execution: any) {
    const executionName = execution[0].name;
    this.logInfo(`Created execution: ${executionName}`);

    let executionFinished = false;
    let backoffDelay = this.backoffDelay;
    this.logInfo("Poll every second for result...");

    while (!executionFinished) {
      const [execution] = await this.getExecution(executionName);
      executionFinished = execution.state !== EXECUTION_STATES.active;

      if (!executionFinished) {
        this.logInfo("- Waiting for results...");
        await sleep(backoffDelay);
        backoffDelay *= 2;
      } else {
        this.logInfo(
          `Execution finished with state: ${execution.state}`,
          execution.result
        );

        this.logInfo(`Execution result: ${execution.state}`, execution);

        return execution.result;
      }
    }
  }

  private getExecution(executionName: string) {
    return this.client.getExecution({
      name: executionName,
    });
  }

  private getWorkflowPath(
    projectName: string,
    location: string,
    workflow: string
  ) {
    return this.client.workflowPath(projectName, location, workflow);
  }
}

export default WorkflowService;
