import { StoryPointsAndCycleTimeRequest } from "../../contract/kanban/KanbanStoryPointParameterVerify";
import { Jira } from "./Jira/Jira";
import { PlatformTypeError } from "../../types/PlatformTypeError";
import { RequestKanbanColumnSetting } from "../../contract/GenerateReporter/GenerateReporterRequestBody";
import { Cards } from "../../models/kanban/RequestKanbanResults";
import { JiraColumnResponse } from "../../contract/kanban/KanbanTokenVerifyResponse";

export interface Kanban {
  // verifyTokenAndGetColumnsAndUser(model: KanbanTokenVerifyModel): Promise<KanbanTokenVerifyResponse>;

  getJiraColumns(
    model: StoryPointsAndCycleTimeRequest
  ): Promise<JiraColumnResponse[]>;
  getStoryPointsAndCycleTime(
    model: StoryPointsAndCycleTimeRequest,
    boardColumns: RequestKanbanColumnSetting[],
    users: string[]
  ): Promise<Cards>;
  getStoryPointsAndCycleTimeForNonDoneCards(
    model: StoryPointsAndCycleTimeRequest,
    boardColumns: RequestKanbanColumnSetting[],
    users: string[]
  ): Promise<Cards>;
}

export enum KanbanEnum {
  JIRA = "jira",
  CLASSIC_JIRA = "classic jira",
}

export class KanbanFactory {
  static getKanbanInstantiateObject(
    type: string,
    token: string,
    site: string = ""
  ): Kanban {
    switch (type.toLowerCase()) {
      case KanbanEnum.JIRA:
      case KanbanEnum.CLASSIC_JIRA:
        return new Jira(token, site);
      default:
        throw new PlatformTypeError(type);
    }
  }
}
