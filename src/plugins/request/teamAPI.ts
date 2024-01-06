import request from './request.ts'
import {Page, Team} from "@/modules/type";
import {CreateTeamParams, JoinTeamParams, SearchPageParams, UpdateTeamParams} from "@/modules/requestParams";

export function createTeam(params: CreateTeamParams): Promise<Team> {
    return request.post(`/team/create`, {
        ...params
    });
}

export function dismissTeam(teamId: number): Promise<string> {
    return request.delete(`/team/dismiss`, {
        params: {
            teamId
        }
    });
}

export function exitTeam(teamId: number): Promise<string> {
  return request.delete(`/team/exit`, {
        params: {
            teamId
        }
    });
}

export function getTeam(teamId: number): Promise<Team> {
    return request.get(`/team/get`, {
        params: {
            teamId
        }
    });
}

export function joinTeam(params: JoinTeamParams): Promise<string> {
  return request.post(`/team/join`, params);
}

export function searchTeam(params: SearchPageParams): Promise<Page<Team>> {
    const {current = 1, size = 5} = params
    return request.get(`/team/search`, {
        params: {
            current,
            size
        }
    });
}

export function transferTeam(teamId: number, userId: number): Promise<string> {
  return request.post(`/api/team/transfer`, {
      params: {
          teamId,
          userId
      }
  });
}

export function updateTeam(params: UpdateTeamParams): Promise<Team> {
    return request.put(`/team/update`, {
        ...params
    });
}
