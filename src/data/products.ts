import pipeImage1 from '../assets/多重增强钢塑复合压力管.png';

export const productData = [
  {
    category: '供水产品',
    id: 'water',
    items: [
      {
        title: '多重增强钢塑复合压力管',
        advantages: '管材抗内外压能力兼优，长期强度稳定，电热熔焊连接技术简便可靠，不会造成输送液体资源的浪费，抗内外腐蚀，使用寿命长，极强的耐磨性，安全无毒性，柔性系统，良好地避免灾害，重量轻，施工安装费用低，原材料消耗成本低于纯塑或其他结构壁塑料压力管材，工程总体造价低，性价比高，具有很强的市场竞争力，管材结构稳定性好，节能环保。',
        applications: '市政管网、农业水利管网、乡镇、工厂、矿山供水、压力排污、海水淡化、城镇水源饮水、水利资源调配、大型工业项目引水工程、综合管廊。',
        image: pipeImage1,
        richHTML: `
          <h3>产品简介</h3>
          <div class="flex flex-col gap-6 mb-8">
            <div class="flex gap-4">
              <figure class="m-0 flex-1">
                <img src="https://picsum.photos/seed/structure1/400/300" alt="带材结构" class="w-full rounded-xl shadow-md border border-slate-100" />
                <figcaption class="text-center text-sm text-slate-500 mt-2">（带材结构）</figcaption>
              </figure>
              <figure class="m-0 flex-1">
                <img src="https://picsum.photos/seed/structure2/400/300" alt="管材结构" class="w-full rounded-xl shadow-md border border-slate-100" />
                <figcaption class="text-center text-sm text-slate-500 mt-2">（管材结构）</figcaption>
              </figure>
            </div>
            <div>
              <p>“天健”牌多重增强钢塑复合压力管是在已有的钢骨架塑料复合管道和钢带增强塑料排水管道技术的基础上，利用金属塑料复合成型、钢塑复合结构设计及带材缠绕焊接成型等技术研发的新型钢塑复合压力输送管道。该管道将结构壁技术、多层壁技术及钢塑复合技术综合运用，既有效地提高了管材的径向强度和环刚度，又降低了塑料的使用量，从而节约了生产成本。</p>
            </div>
          </div>

          <h3>带材及管材结构</h3>
          <p>根据口径不同，管材由一层或二层钢塑复合带材同步螺旋缠绕焊接而成。外层带材由板带和与板带表面垂直且与板带成一体的竖直加强肋构成。加强肋内复合有增强钢带，板带内依不同强度需求复合有多层增强钢丝网。内层带材呈等厚带状，与外层带材等宽，内有多层增强钢丝网夹层。由单层带材构成管材时，外层带材螺旋缠绕，边缘采取搭接形式，设计足够的搭接宽度，以保证管材有足够的轴向强度。由双层带材构成管材时，内外层带材的螺旋缠绕接缝错开，以使管材获得最大的轴向强度。单层带材的搭接及内外层带材之间的贴合均采取同种塑料连续挤出压合的焊接形式。</p>

          <h3>管材规格及压力/环刚度系列</h3>
          <div class="overflow-x-auto my-6">
            <table class="w-full text-center border-collapse border border-slate-200 min-w-[500px]">
              <thead>
                <tr class="bg-brand-blue/5">
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">公称直径 dn(mm)</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">公称压力 PN(MPa)</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">环刚度 SN(KN/m²)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-slate-200 p-3 text-slate-600">315 ~ 710</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.6 / 0.8 / 1.0</td>
                  <td class="border border-slate-200 p-3 text-brand-orange font-bold">≥12.5</td>
                </tr>
                <tr class="bg-slate-50/50">
                  <td class="border border-slate-200 p-3 text-slate-600">800 ~ 1200</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.6 / 0.8 / 1.0</td>
                  <td class="border border-slate-200 p-3 text-brand-orange font-bold">≥12.5</td>
                </tr>
                <tr>
                  <td class="border border-slate-200 p-3 text-slate-600">1500 ~ 2200</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.6 / 0.8 / 1.0</td>
                  <td class="border border-slate-200 p-3 text-brand-orange font-bold">≥10</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>公称压力的温度修正系数</h3>
          <p>管材在输送20℃以上介质时，最大许用压力可用下表所示的修正系数乘以公称压力进行确定。</p>
          <div class="overflow-x-auto my-6">
            <table class="w-full text-center border-collapse border border-slate-200 min-w-[500px]">
              <thead>
                <tr class="bg-brand-blue/5">
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">温度 t/℃</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">0＜t≤20</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">30</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">40</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">50</th>
                  <th class="border border-slate-200 p-3 text-brand-blue font-bold">60</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-slate-200 p-3 text-slate-800 font-medium">公称压力修正系数</td>
                  <td class="border border-slate-200 p-3 text-slate-600">1.00</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.95</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.90</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.80</td>
                  <td class="border border-slate-200 p-3 text-slate-600">0.70</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>管道特性及优点</h3>
          <ul>
            <li><strong>管材抗内外压能力兼优，长期强度稳定：</strong>采用在管壁中设计钢带和钢网二种骨架增强相，分别提高塑料管道抗外压的环刚度和抗内压的环应力而大幅度提高钢管寿命。</li>
            <li><strong>电热熔焊连接技术简便可靠，100%无泄漏：</strong>完全隔绝了管道内液体向外界的泄露。</li>
            <li><strong>抗内外腐蚀，使用寿命长：</strong>不存在蠕变问题故其使用寿命远高于纯塑料管道，耐磨损、抗腐蚀使得其使用寿命可达100年以上。</li>
            <li><strong>极强的耐磨性：</strong>实验证明，在等同流速条件下，其耐磨性要优于普通钢管3至5倍。</li>
            <li><strong>内壁光滑，输送阻力小：</strong>粗糙率很小，不结垢而且塑料材料具有很强的抗附着性。采用直径较小的多重增强管就可以达到同等流量要求。</li>
            <li><strong>柔性系统避灾：</strong>高密度聚乙烯和钢带均具有良好的柔韧性，即使发生土壤沉降甚至地震，管道也不会断裂。</li>
            <li><strong>原材消耗低于纯塑或其他管材：</strong>由于使用了增强钢带和钢网骨架，管材壁厚可以大大减薄，从而大幅度节省原材料成本，性价比极高。</li>
            <li><strong>绿色节能环保：</strong>生产制造过程没有废气废水产生，零排放，废旧材料可100%粉碎回收回炉使用。</li>
          </ul>

          <h3>管材连接结构</h3>
          <p>多重增强钢塑复合压力管主要有 <strong>电熔直接连接</strong> 和 <strong>钢塑复合管电热熔带连接</strong> 这两种方式。</p>
          <div class="flex flex-col sm:flex-row gap-6 mt-6 mb-4">
            <figure class="m-0 flex-1">
              <img src="https://picsum.photos/seed/connect1/500/300" alt="电熔直接连接" class="w-full rounded-xl shadow-md border border-slate-100" />
              <figcaption class="text-center text-sm text-slate-500 mt-2 font-medium">电熔直接连接</figcaption>
            </figure>
            <figure class="m-0 flex-1">
              <img src="https://picsum.photos/seed/connect2/500/300" alt="钢塑复合电热熔带连接" class="w-full rounded-xl shadow-md border border-slate-100" />
              <figcaption class="text-center text-sm text-slate-500 mt-2 font-medium">钢塑复合电热熔带连接</figcaption>
            </figure>
          </div>
          <p>钢塑复合电热熔带连接可以适用于所有规格的管材连接，其是一种典型的多层结构，塑料带中间有多层增强钢丝网夹层，表层下设置有加热金属网，其表面覆盖有用以提高连接水密性防止氧气渗入并保护加热网的塑料膜保护层。</p>
        `
      },
      {
        title: '内定径钢骨架增强聚乙烯复合管',
        advantages: '抗蠕变性能好，持久机械强度高，耐冲击性能好、轴向具有适当柔性，管壁不结垢、不结蜡，无毒性、不分解、无微生物累积，耐温性能好，内壁光滑、流阻低，容易定位跟踪，环向具有足够刚度，热膨胀系数小、重量轻，抗候性、抗紫外线性能好，内表面耐高腐蚀性介质、外表面适应强腐蚀使用环境，系列化管材、管件与连接结构构成完善安全的管道系统。',
        applications: '化工、油田、市政建设、船舶、矿山、农业、海水输送。',
        image: 'https://picsum.photos/seed/pipe2/800/600',
      },
      {
        title: '外定径钢骨架增强聚乙烯复合管',
        advantages: '抗蠕变性能好，持久机械强度高，耐冲击性能好、轴向具有适当柔性，管壁不结垢、不结蜡，无毒性、不分解、无微生物累积，耐温性能好，内壁光滑、流阻低，容易定位跟踪，环向具有足够刚度，热膨胀系数小、重量轻，抗候性、抗紫外线性能好，内表面耐高腐蚀性介质、外表面适应强腐蚀使用环境，系列化管材、管件与连接结构构成完善安全的管道系统。',
        applications: '化工、油田、市政建设、船舶、矿山、农业、海水输送。',
        image: 'https://picsum.photos/seed/pipe3/800/600',
      },
      {
        title: '钢丝网增强聚乙烯复合耐磨管',
        advantages: '是以聚烯烃热塑性弹性体为内层与钢丝网增强聚乙烯复合管的内层共挤出成型的复合管道，这种管道既保持了钢丝网增强聚乙烯复合管优良的物化力学性能，又具有很好的耐磨性能。',
        applications: '化工、电力、冶金、水泥、粮食。',
        image: 'https://picsum.photos/seed/pipe4/800/600',
      },
      {
        title: '钢丝网骨架塑料（聚乙烯）复合管',
        advantages: '分为双层钢丝网增强聚乙烯复合管、四层钢丝网增强聚乙烯复合管。具有超过普通塑料管的强度、刚性、抗冲击性，类似于钢管的低线膨胀系数和抗蠕变性等特点。钢丝网增强聚乙烯复合耐磨管具有优良的耐磨性能，同市场上广泛使用的耐磨管如超高分子量聚乙烯管、内衬钢管等比较，耐磨性能更为优异。',
        applications: '市政工程、工业领域、油田矿山、煤矿、海水输送、高速公路、电力工程、农业喷灌等。',
        image: 'https://picsum.photos/seed/pipe5/800/600',
      },
      {
        title: '聚乙烯（PE）管',
        advantages: '良好的卫生性能、良好的耐腐蚀性能、长久的使用寿命、较好的耐冲击性。',
        applications: 'PE管有中密度聚乙烯管和高密度聚乙烯管。根据壁厚分为SDR11和SDR17.6系列。前者适用于输送气态的人工煤气、天然气、液化石油气，后者主要用于输送天然气。',
        image: 'https://picsum.photos/seed/pipe6/800/600',
      }
    ]
  },
  {
    category: '排水产品',
    id: 'drainage',
    items: [
      {
        title: '低压排水用多重增强复合管',
        advantages: '管材结构特殊设计，有效分散外部承载力。整体抗压能力强且重量轻，大口径下依然保持优异的环刚度。内外双面防腐体系，确保苛刻水土环境下的长久使用；内壁极致光滑，不易附着水垢和淤泥，实现高流量通水能力，从而降低整体运营维护成本。',
        applications: '重载市政道路雨水排放、工业园区污水排放主干管网络、海绵城市建设及老旧小区地下排水系统改造。',
        image: 'https://picsum.photos/seed/drainage1/800/600',
      },
      {
        title: '内肋增强聚乙烯（PE）螺旋波纹管',
        advantages: '独特的管壁三层结构，并在中间部位增加了高强度内肋，大幅度提升了管材的环刚度和抗冲击性能。相比普通双壁波纹管，它在抗土壤不均匀沉降方面表现更为出色，耐化学腐蚀性能极佳，电热熔连接严密安全，100%防止地下排水泄漏。',
        applications: '城市地下排污排涝系统、高速公路与高架桥墩排水、垃圾填埋场渗滤液收集、以及大型农业水利灌溉工程。',
        image: 'https://picsum.photos/seed/drainage2/800/600',
      },
      {
        title: '高强度聚丙烯（PP-HM）双壁波纹管',
        advantages: '采用高模量聚丙烯材料(PP-HM)精密挤出成型，自带极高的环刚度（轻易满足SN8~SN16 标准），且具备出众的抗沉降和耐冲击能力。兼具耐磨损结构设计，比重轻于传统管材，能使现场搬运、铺设、安装更加便捷，有效缩短施工周期。',
        applications: '适用于车流量密集的市政重交通道路排水、深埋苛刻条件下的雨污分流工程、化学工业区腐蚀性废水排污管道。',
        image: 'https://picsum.photos/seed/drainage3/800/600',
      },
      {
        title: 'HDPE双壁波纹管',
        advantages: '内壁平滑能最大化降低流体摩擦阻力，波纹状外壁则提供了优越的抗压刚性。良好的化学稳定性能隔绝绝大多数酸碱盐的腐蚀；弹性密封圈连接安全防渗漏，能在低温环境下正常施工，综合施工成本低，设计使用寿命可达50年以上。',
        applications: '广泛用于大规模市政建设地下排污排水网络、新城开发厂区与住宅小区排水系统、高尔夫球场及大面积农田灌溉排水网络。',
        image: 'https://picsum.photos/seed/drainage4/800/600',
      },
      {
        title: '钢带增强聚乙烯（PE）螺旋波纹管',
        advantages: '将高强度防腐钢带的高物理刚性与聚乙烯塑料的耐腐蚀、柔韧特性完美结合。它不仅能承受超大的外部土壤压力与交通动载，还能随轻微的地壳变形而不破裂。安全无毒，提供挤出焊接、热缩帯、电热熔带等多种牢靠的连接方式。',
        applications: '用于长距离、大口径的地埋排污管道系统，超大型市政水利枢纽工程，隧道排水以及跨河倒虹吸引水排污设施。',
        image: 'https://picsum.photos/seed/drainage5/800/600',
      }
    ]
  },
  {
    category: '连接件',
    id: 'accessories',
    items: [
      {
        title: '标准电熔管件系列 (直接/三通/弯头/法兰)',
        advantages: '专门为钢丝网骨架、钢塑复合管道及各类 PE 管道定制设计的高功能连接件。选用高纯度聚乙烯原材料并预埋高品质发热电阻丝，通电后能快速均匀加热，熔融渗透效果完美。焊接完成后，管材与管件融为一体，能承受与管材同等的系统压力，完美避免节点松动或渗漏问题，寿命可观。',
        applications: '给水、排水、消防系统、燃气及天然气输配管网等各种复杂管道网络体系中的线路分支、转角、延长与阀门对接连结。',
        image: 'https://picsum.photos/seed/fitting1/800/600',
      },
      {
        title: '专业电热熔带',
        advantages: '主要用于大口径波纹管、钢带增强管的外壁连接加密。施工灵活性极强，不受现场地形和管材口径局限，缠绕焊接后冷却固化，具有绝佳的封水防渗效果和显著的结构拉伸强度。兼顾抗紫外线、抗老化能力。',
        applications: '超大口径市政排污管道对接、长距离雨污分流工程快速拼装、波纹管破损抢修补漏。',
        image: 'https://picsum.photos/seed/fitting2/800/600',
      }
    ]
  }
];
