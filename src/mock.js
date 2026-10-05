export const mockData = {
  user: { nickname: '平台管理员', admin: 1 },
  insights: {
    generatedAt: '2026-10-05 11:30:00',
    health: { status: 'healthy', errors24h: 0, slowRequests24h: 2 },
    matchTrend: [
      { month: '2026-05', matchCount: 142 }, { month: '2026-06', matchCount: 168 },
      { month: '2026-07', matchCount: 191 }, { month: '2026-08', matchCount: 176 },
      { month: '2026-09', matchCount: 224 }, { month: '2026-10', matchCount: 96 }
    ],
    applyTrend: [
      { month: '2026-05', participantCount: 3860, entryFee: 76200 }, { month: '2026-06', participantCount: 4290, entryFee: 88400 },
      { month: '2026-07', participantCount: 5180, entryFee: 104600 }, { month: '2026-08', participantCount: 4870, entryFee: 98200 },
      { month: '2026-09', participantCount: 6340, entryFee: 132800 }, { month: '2026-10', participantCount: 2810, entryFee: 59400 }
    ],
    recentMatches: [
      { id: 101, matchName: '2026 杭州秋季乒乓球公开赛', matchFormat: 'single', cityName: '杭州', matchStatus: 1, currentParticipants: 86, maxParticipants: 128, createTime: '2026-10-05 09:26:00' },
      { id: 102, matchName: '浦东新区俱乐部团体邀请赛', matchFormat: 'team', cityName: '上海', matchStatus: 1, currentParticipants: 18, maxParticipants: 24, createTime: '2026-10-04 16:18:00' },
      { id: 103, matchName: '宁波银球双打积分赛', matchFormat: 'double', cityName: '宁波', matchStatus: 2, currentParticipants: 62, maxParticipants: 64, createTime: '2026-10-04 10:08:00' }
    ]
  },
  dashboard: {
    summary: {
      adminName: '王管理员', pendingOrganizerCount: 6, pendingPersonalOrganizerCount: 9,
      organizerTotalCount: 128, personalOrganizerTotalCount: 246, approvedOrganizerCount: 116,
      approvedPersonalOrganizerCount: 218, pendingFeedbackCount: 4
    },
    organizerApplications: [
      { id: 901, orgName: '杭州跃动体育', contactName: '陈经理', contactPhone: '138****7219', cityName: '杭州', createTime: '2026-10-05 09:18:22', auditStatus: 0 },
      { id: 900, orgName: '宁波银球俱乐部', contactName: '林先生', contactPhone: '137****1530', cityName: '宁波', createTime: '2026-10-04 16:42:10', auditStatus: 0 },
      { id: 899, orgName: '苏州新锐赛事', contactName: '周女士', contactPhone: '159****8831', cityName: '苏州', createTime: '2026-10-04 11:06:34', auditStatus: 0 }
    ],
    personalOrganizerApplications: [
      { id: 601, organizerName: '滨江周末球友会', realName: '徐晨', phone: '136****7622', cityName: '杭州', createTime: '2026-10-05 08:30:00', auditStatus: 0 },
      { id: 600, organizerName: '浦东乒乓联盟', realName: '赵一鸣', phone: '158****1168', cityName: '上海', createTime: '2026-10-03 19:20:00', auditStatus: 0 }
    ]
  },
  matches: {
    totalMatchCount: 1284, finishedMatchCount: 1036, unfinishedMatchCount: 248,
    organizerHostedMatchCount: 782, personalOrganizerHostedMatchCount: 502,
    participantCount: 38642, participantCountOrganizer: 24760, participantCountPersonalOrganizer: 13882,
    totalEntryFee: 768420, entryFeeOrganizer: 531280, entryFeePersonalOrganizer: 237140,
    matchByFormat: { single: 694, double: 328, team: 262 },
    participantFormatGlobal: { singlePeople: 18330, doublePeople: 11248, teamPeople: 9064, maleCount: 27831, femaleCount: 10297, unknownGenderCount: 514 },
    feeFormatGlobal: { singleFee: 331260, doubleFee: 198480, teamFee: 238680 },
    teamGroupsTotal: 1288, doublePairCountTotal: 5624,
    matchByCity: [
      { cityName: '杭州', totalMatches: 386, organizerMatches: 241, personalMatches: 145 },
      { cityName: '上海', totalMatches: 292, organizerMatches: 188, personalMatches: 104 },
      { cityName: '宁波', totalMatches: 218, organizerMatches: 132, personalMatches: 86 },
      { cityName: '苏州', totalMatches: 176, organizerMatches: 104, personalMatches: 72 },
      { cityName: '南京', totalMatches: 126, organizerMatches: 73, personalMatches: 53 },
      { cityName: '其他', totalMatches: 86, organizerMatches: 44, personalMatches: 42 }
    ],
    participantByCity: [
      { cityName: '杭州', peopleTotal: 12450, maleCount: 8910, femaleCount: 3380 },
      { cityName: '上海', peopleTotal: 9360, maleCount: 6688, femaleCount: 2531 },
      { cityName: '宁波', peopleTotal: 6742, maleCount: 4870, femaleCount: 1782 },
      { cityName: '苏州', peopleTotal: 4930, maleCount: 3610, femaleCount: 1250 },
      { cityName: '南京', peopleTotal: 3240, maleCount: 2410, femaleCount: 790 },
      { cityName: '其他', peopleTotal: 1920, maleCount: 1343, femaleCount: 564 }
    ],
    feeByCity: [
      { cityName: '杭州', totalFee: 246800 }, { cityName: '上海', totalFee: 186420 },
      { cityName: '宁波', totalFee: 128600 }, { cityName: '苏州', totalFee: 98600 },
      { cityName: '南京', totalFee: 67400 }, { cityName: '其他', totalFee: 40600 }
    ]
  },
  leisure: {
    publishedVenueCount: 186, onShelfVenueCount: 149, totalConfiguredTables: 1268,
    publisherOrganizerCount: 92, bookedTableHours: 18426, totalBookingRows: 9682,
    activeBookingCount: 864, completedBookingCount: 8361, totalBookingFee: 492860,
    leisureByCity: [
      { cityName: '杭州', publishedVenueCount: 56, onShelfVenueCount: 48, bookedTableHours: 5480, totalBookingFee: 156800 },
      { cityName: '上海', publishedVenueCount: 42, onShelfVenueCount: 34, bookedTableHours: 4260, totalBookingFee: 129200 },
      { cityName: '宁波', publishedVenueCount: 31, onShelfVenueCount: 26, bookedTableHours: 3120, totalBookingFee: 82460 },
      { cityName: '苏州', publishedVenueCount: 27, onShelfVenueCount: 21, bookedTableHours: 2480, totalBookingFee: 68800 },
      { cityName: '其他', publishedVenueCount: 30, onShelfVenueCount: 20, bookedTableHours: 3086, totalBookingFee: 55600 }
    ]
  },
  activities: [
    { id: 1, actionName: '审核通过主办方认证', category: '审核', createTime: '2026-10-05 10:42:18', nickname: '王管理员', statusCode: 200 },
    { id: 2, actionName: '更新平台赛事配置', category: '配置', createTime: '2026-10-05 09:26:07', nickname: '赵管理员', statusCode: 200 },
    { id: 3, actionName: '处理用户建议反馈', category: '反馈', createTime: '2026-10-04 18:33:45', nickname: '王管理员', statusCode: 200 },
    { id: 4, actionName: '管理员访问赛事统计', category: '访问', createTime: '2026-10-04 17:08:20', nickname: '系统管理员', statusCode: 200 },
    { id: 5, actionName: '场馆预约查询超时', category: '异常', createTime: '2026-10-04 15:41:09', nickname: '系统', statusCode: 500 }
  ]
}
