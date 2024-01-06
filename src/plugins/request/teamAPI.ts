import request from './request.ts'
import {Page, Team} from "@/modules/type";
import {CreateTeamParams, JoinTeamParams, SearchPageParams, UpdateTeamParams} from "@/modules/requestParams";
import {BaseResponse} from "../../modules/type";

export function createTeam(params: CreateTeamParams): BaseResponse<Team> {
    return request.post(`/team/create`, {
        ...params
    });
}

export function dismissTeam(teamId: number): BaseResponse<string> {
    return request.delete(`/team/dismiss`, {
        params: {
            teamId
        }
    });
}

export function exitTeam(teamId: number): BaseResponse<string> {
  return request.delete(`/team/exit`, {
        params: {
            teamId
        }
    });
}

export function getTeam(teamId: number): BaseResponse<Team> {
    return request.get(`/team/get`, {
        params: {
            teamId
        }
    });
}

export function joinTeam(params: JoinTeamParams): BaseResponse<string> {
  return request.post(`/team/join`, params);
}

export function searchTeam(params: SearchPageParams): BaseResponse<Page<Team>> {
    const {current = 1, size = 5} = params
    return request.get(`/team/search`, {
        params: {
            current,
            size
        }
    });
}

export function transferTeam(teamId: number, userId: number): BaseResponse<string> {
  return request.post(`/api/team/transfer`, {
      params: {
          teamId,
          userId
      }
  });
}

export function updateTeam(params: UpdateTeamParams): BaseResponse<Team> {
    return request.put(`/team/update`, {
        ...params
    });
}
