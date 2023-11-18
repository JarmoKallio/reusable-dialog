import * as lodash from 'lodash';

export interface Band {
  members: Members,
  plays?: Object
}

export interface Members {
  current: Array<Member>,
  past: Array<Member>,
  all?: Array<string>
}

export interface Member {
  name: string,
  age: number,
  plays: Array<string>
}

export class DataTransformer {

  public static transformData(band: Band): Band {
    let transformedBand = lodash.cloneDeep(band);

    const allMembers: Array<Member> = this.getAllMembersAsSortedList(transformedBand.members);
    transformedBand.members["all"] = allMembers.map((member) => { return this.lowercaseFirstCharacter(member.name); });

    return {
      members: transformedBand.members,
      plays: this.getPlays(allMembers)
    }
  }

  private static getPlays(allMembers: Array<Member>): Object {
    const playsMap: Map<string, Set<string>> = allMembers.reduce((accumulator, member) => this.addPlays(accumulator, member), new Map());

    let mapWithArrays: Map<string, Array<string>> = new Map();
    playsMap.forEach((value, key) => { mapWithArrays.set(key, Array.from(value)) })

    return Object.fromEntries(mapWithArrays.entries());
  }

  private static addPlays(playsMap: Map<string, Set<string>>, member: Member): Map<string, Set<string>> {
    member.plays.forEach(instrument => {
      const lowercaseName: string = this.lowercaseFirstCharacter(member.name);
      if (playsMap.get(instrument) == null) {
        playsMap.set(instrument, new Set<string>().add(lowercaseName));
      } else {
        playsMap.get(instrument)?.add(lowercaseName)
      }
    });

    return playsMap;
  }

  private static getAllMembersAsSortedList(members: Members): Array<Member> {
    let allMembers: Array<Member> = [];
    const memberObjectKeys = Object.keys(members) as Array<keyof typeof members>;

    memberObjectKeys.forEach((key) => {
      let array = members[key] as Array<Member>;
      allMembers.push(...array);
    });

    return allMembers.sort(this.sortMembers);
  }

  private static sortMembers(memberA: Member, memberB: Member): number {
    if (memberA.age == memberB.age) {
      if (memberA.name < memberB.name) { return -1 }
      else if (memberA.name < memberB.name) { return 1 }
      else { return 0; }
    }
    else if (memberA.age < memberB.age) { return 1 }
    else { return -1 }
  }

  private static lowercaseFirstCharacter(string: string): string {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
}
