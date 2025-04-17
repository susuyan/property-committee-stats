import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuidePage() {
  return (
    <div className="container mx-auto py-6 space-y-6 px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center">业委会组建指南</h1>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">什么是业主委员会？</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <p className="text-sm sm:text-base">
            业主委员会（简称业委会）是由业主大会选举产生的，代表全体业主利益的组织。它是业主自我管理、自我服务的重要组织形式，是维护业主合法权益的重要载体。
          </p>
          <p className="text-sm sm:text-base">
            业委会的主要职责包括：监督物业服务企业履行物业服务合同、组织业主共同决定物业服务事项、监督管理专项维修资金的使用、协调解决物业管理纠纷等。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">业委会组建的法律依据</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <p className="text-sm sm:text-base">
            根据《中华人民共和国民法典》和《物业管理条例》等法律法规，业主可以通过召开业主大会，选举产生业主委员会，实行自我管理。
          </p>
          <p className="text-sm sm:text-base">
            《民法典》第二百七十八条规定："业主可以设立业主大会，选举业主委员会。业主委员会执行业主大会的决定事项，履行职责。"
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">业委会组建流程</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base">
            <li>
              <strong>筹备组成立</strong>
              ：由街道办事处或乡镇人民政府、社区居委会、物业服务企业和业主代表共同组成筹备组。
            </li>
            <li>
              <strong>业主信息核实</strong>：筹备组负责核实业主身份信息，确定业主在业主大会中的投票权数。
            </li>
            <li>
              <strong>征求业主意见</strong>：就业主大会筹备事项征求业主意见，并公示征求意见结果。
            </li>
            <li>
              <strong>制定管理规约和业主大会议事规则草案</strong>
              ：筹备组根据法律法规和业主意见，制定管理规约和业主大会议事规则草案。
            </li>
            <li>
              <strong>召开首次业主大会会议</strong>：由筹备组发布公告，组织召开首次业主大会会议。
            </li>
            <li>
              <strong>选举产生业主委员会</strong>
              ：在首次业主大会会议上，通过管理规约和业主大会议事规则，选举产生业主委员会。
            </li>
            <li>
              <strong>备案</strong>
              ：业主委员会应当自选举产生之日起30日内，向物业所在地的区县房地产行政主管部门和街道办事处或乡镇人民政府备案。
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">业委会组建的条件</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <p className="text-sm sm:text-base">根据相关法律法规，业委会组建通常需要满足以下条件：</p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            <li>物业已经交付使用，并且已经形成相对稳定的业主群体。</li>
            <li>参与投票的业主人数达到全体业主总人数的50%以上。</li>
            <li>参与投票的业主所拥有的建筑面积达到物业总建筑面积的50%以上。</li>
            <li>业主委员会委员候选人获得参与投票的业主所持投票权数的过半数同意。</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">业委会的权利与义务</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">权利</h3>
              <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                <li>召集业主大会会议，报告物业服务情况。</li>
                <li>代表业主与物业服务企业签订物业服务合同。</li>
                <li>监督物业服务企业履行物业服务合同。</li>
                <li>组织业主共同决定物业共用部位、共用设施设备的维修和更新、改造等事项。</li>
                <li>监督管理专项维修资金的使用。</li>
                <li>协调解决业主之间、业主与物业服务企业之间的物业管理纠纷。</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">义务</h3>
              <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                <li>执行业主大会的决定。</li>
                <li>接受业主的监督。</li>
                <li>定期向业主通报工作情况。</li>
                <li>不得擅自使用业主共有财产。</li>
                <li>不得侵害业主的合法权益。</li>
                <li>不得与物业服务企业有任何利益关系。</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">常见问题解答</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Q: 业委会委员有报酬吗？</h3>
              <p className="text-sm sm:text-base">
                A: 业委会委员一般是义务工作，不领取报酬。但可以根据业主大会的决定，给予适当的工作补贴。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Q: 业委会的任期是多久？</h3>
              <p className="text-sm sm:text-base">
                A: 业委会委员的任期一般为3-5年，具体由业主大会议事规则确定。任期届满后，应当进行换届选举。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Q: 业委会可以更换物业公司吗？</h3>
              <p className="text-sm sm:text-base">
                A: 业委会可以根据业主大会的决定，代表业主与物业服务企业解除合同，并选聘新的物业服务企业。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Q: 如何监督业委会的工作？</h3>
              <p className="text-sm sm:text-base">
                A: 业主可以通过参加业主大会会议、查阅业委会工作报告和财务报告、向业委会提出质询等方式监督业委会的工作。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
