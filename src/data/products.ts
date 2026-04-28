import pipeImage1 from '../assets/pipe-product.png';

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
            <div class="flex flex-col sm:flex-row gap-4">
              <figure class="m-0 flex-1">
                <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%A4%9A%E9%87%8D%E5%A2%9E%E5%BC%BA%E9%92%A2%E5%A1%91%E5%A4%8D%E5%90%88%E5%8E%8B%E5%8A%9B%E7%AE%A1%EF%BC%88%E5%B8%A6%E6%9D%90%E7%BB%93%E6%9E%84%EF%BC%89.jpg" alt="带材结构" class="w-full h-56 md:h-72 rounded-xl shadow-md border border-slate-100 object-contain bg-white p-4" />
                <figcaption class="text-center text-sm text-slate-500 mt-2">（带材结构）</figcaption>
              </figure>
              <figure class="m-0 flex-1">
                <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%A4%9A%E9%87%8D%E5%A2%9E%E5%BC%BA%E9%92%A2%E5%A1%91%E5%A4%8D%E5%90%88%E5%8E%8B%E5%8A%9B%E7%AE%A1%EF%BC%88%E7%AE%A1%E6%9D%90%E7%BB%93%E6%9E%84%EF%BC%89.jpg" alt="管材结构" class="w-full h-56 md:h-72 rounded-xl shadow-md border border-slate-100 object-contain bg-white p-4" />
                <figcaption class="text-center text-sm text-slate-500 mt-2">（管材结构）</figcaption>
              </figure>
            </div>
            <div>
              <p>“天健”牌多重增强钢塑复合压力管是在已有的钢骨架塑料复合管道和钢带增强塑料排水管道技术的基础上，利用金属塑料复合成型、钢塑复合结构设计及带材缠绕焊接成型等技术研发的新型钢塑复合压力输送管道。该管道将结构壁技术、多层壁技术及钢塑复合技术综合运用，既有效地提高了管材的径向强度 and 环刚度，又降低了塑料的使用量，从而节约了生产成本。</p>
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
            <li><strong>电热熔焊连接技术简便可靠，100%无泄漏：</strong>完全隔绝了管道内液体向外界的泄漏。</li>
          </ul>
        `
      },
      {
        title: '内定径钢骨架增强聚乙烯复合管',
        advantages: '抗蠕变性能好，持久机械强度高，不会发生快速开裂，耐冲击性能好，轴向具有适当柔性，管壁不结垢、不结蜡，无毒性、不分解、无微生物累积，耐温性能好，内壁光滑、流阻低，容易定位跟踪，环向具有足够刚度，热膨胀系数小，重量轻，抗候性、抗紫外线性能好，内表面耐高腐蚀性介质、外表面适应强腐蚀使用环境，系列化管材、管件与连接结构构成完善安全的管道系统。',
        applications: '化工：腐蚀性介质输送；油田：含硫油气水输送；市政建设：给排水、天然气输送；船舶：生活及结构管系；矿山：矿浆输送；农业：深井滤水灌溉；海水输送：淡化及电厂。',
        image: 'https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/main/%E5%86%85%E5%AE%9A%E5%BE%84%E9%92%A2%E9%AA%A8%E6%9E%B6%E5%A2%9E%E5%BC%BA%E8%81%9A%E4%B9%99%E7%83%AF%E5%A4%8D%E5%90%88%E7%AE%A1.png',
        richHTML: `
          <h3>产品简介</h3>
          <div class="flex flex-col md:flex-row gap-10 items-stretch mb-12">
            <div class="flex-1 text-slate-600 bg-slate-50/50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col justify-center">
              <p class="text-base md:text-lg leading-[2] text-justify indent-8 tracking-wide font-medium text-slate-700">
                钢骨架塑料复合管是一种以缠绕并焊接成型的<span class="text-brand-blue font-bold">钢丝网作为加强骨架</span>，以聚乙烯等热塑性塑料为基体，并将两者均匀地复合在一起，在生产线上连续生产的复合结构管道。
              </p>
            </div>
            <div class="flex-1 flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E5%86%85%E5%AE%9A%E5%BE%84%E9%92%A2%E9%AA%A8%E6%9E%B6%E5%A2%9E%E5%BC%BA%E8%81%9A%E4%B9%99%E7%83%AF%E5%A4%8D%E5%90%88%E7%AE%A1%E8%AF%A6%E6%83%85%E9%A1%B5%E5%9B%BE%E7%89%87.jpg" alt="内定径钢骨架复合管结构图" class="w-full h-full min-h-[300px] object-cover rounded-2xl shadow-lg border border-slate-100 bg-white p-8 hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
          
          <h3>产品特点</h3>
          <ul>
            <li><strong>抗蠕变性能好，持久机械强度高：</strong>由于钢丝网骨架的加强作用，克服了塑料材质的持久变形缺陷。</li>
            <li><strong>不会发生快速开裂：</strong>钢丝网结构有效阻断裂纹扩展。</li>
            <li><strong>耐冲击性能好：</strong>可以承受高强度的冲击 and 碰撞。</li>
            <li><strong>轴向具有适当柔性：</strong>面对不规则地质有很好的适应能力。</li>
            <li><strong>管壁不结垢、不结蜡：</strong>内壁光滑，流体运行畅通。</li>
            <li><strong>寿命长：</strong>系统寿命长达50年。</li>
          </ul>
        `
      },
      {
        title: '外定径钢骨架增强聚乙烯复合管',
        advantages: '抗蠕变性能好，持久机械强度高，不会发生快速开裂，耐冲击性能好，轴向具有适当柔性，管壁不结垢、不结蜡，无毒性、不分解、无微生物累积，耐温性能好，内壁光滑、流阻低，容易定位跟踪，环向具有足够刚度，热膨胀系数小，重量轻，抗候性、抗紫外线性能好，内表面耐高腐蚀性介质、外表面适应强腐蚀使用环境，系列化管材、管件与连接结构构成完善安全的管道系统。',
        applications: '化工、油田、市政建设、船舶、矿山、农业、海水输送。',
        image: 'https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E5%A4%96%E5%AE%9A%E5%BE%84%E9%92%A2%E9%AA%A8%E6%9E%B6%E5%A2%9E%E5%BC%BA%E8%81%9A%E4%B9%99%E7%83%AF%E5%A4%8D%E5%90%88%E7%AE%A1.png',
        richHTML: `
          <h3>产品简介</h3>
          <div class="flex flex-col md:flex-row gap-10 items-stretch mb-12">
            <div class="flex-1 text-slate-600 bg-slate-50/50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col justify-center">
              <p class="text-base md:text-lg leading-[2] text-justify indent-8 tracking-wide font-medium text-slate-700">
                钢骨架塑料复合管是一种以缠绕并焊接成型的钢丝网作为加强骨架，以聚乙烯等热塑性塑料为基体，并将两者均匀地复合在一起，在生产线上连续生产的复合结构管道。其<span class="text-brand-blue font-bold">外定径</span>设计符合相关标准。
              </p>
            </div>
            <div class="flex-1 flex items-center justify-center">
              <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E5%A4%96%E5%AE%9A%E5%BE%84%E9%92%A2%E9%AA%A8%E6%9E%B6%E5%A2%9E%E5%BC%BA%E8%81%9A%E4%B9%99%E7%83%AF%E5%A4%8D%E5%90%88%E7%AE%A1%E8%AF%A6%E6%83%85%E9%A1%B5%E5%9B%BE%E7%89%87.jpg" alt="外定径钢骨架复合管" class="w-full h-full min-h-[300px] object-cover rounded-2xl shadow-lg border border-slate-100 bg-white p-4 hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
          
          <h3>产品特点</h3>
          <ul>
            <li><strong>抗蠕变性能：</strong>钢丝网骨架的加强作用克服了塑料的持久变形。</li>
            <li><strong>耐冲击性：</strong>可以承受高强度的冲击 and 碰撞。</li>
            <li><strong>轴向柔性：</strong>面对不规则地质有很好的适应能力。</li>
          </ul>
        `
      },
      {
        title: '钢丝网增强聚乙烯复合耐磨管',
        advantages: '具有极高的抗磨损能力、耐腐蚀、耐冲击、自润滑性，适用于受磨损严重的介质输送。',
        applications: '矿山尾矿输送、洗煤厂、电厂粉煤灰输送、疏浚工程、化工浆体输送。',
        image: 'https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E5%A2%9E%E5%BC%BA%E8%81%9A%E4%B9%99%E7%83%AF%E5%A4%8D%E5%90%88%E8%80%90%E7%A3%A8%E7%AE%A1.png',
        richHTML: `
          <h3>产品简介</h3>
          <p class="text-slate-600 mb-6">钢丝网增强聚乙烯复合耐磨管是以高强度钢丝网为增强骨架，以耐磨改性聚乙烯为基体，通过热熔粘接树脂将骨架与内外层塑料紧密结合而成的一种新型复合管材。</p>

          <h3>性能特点</h3>
          <ul class="text-sm space-y-2 mb-8">
            <li><strong>卓越耐磨性：</strong>采用耐磨改性PE材料，耐磨性是普通钢管的4-7倍。</li>
            <li><strong>高机械强度：</strong>钢丝网骨架提供了优异的承压能力 and 抗冲击性能。</li>
            <li><strong>耐腐蚀性：</strong>对多种化学介质具有极佳的耐腐蚀性能。</li>
            <li><strong>自润滑性：</strong>摩阻系数小，不易结垢。</li>
          </ul>
        `
      },
      {
        title: '钢丝网骨架塑料（聚乙烯）复合管',
        advantages: '具有超过普通塑料管的强度、刚性、抗冲击性。双面防腐，内壁光滑不结垢，流阻小，寿命长达50年。',
        applications: '市政工程、工业领域、油田矿山、煤矿、电力工程等任务。',
        image: 'https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E9%AA%A8%E6%9E%B6%E5%A1%91%E6%96%99%EF%BC%88%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%89%E5%A4%8D%E5%90%88%E7%AE%A1.png',
        richHTML: `
          <h3>产品简介</h3>
          <div class="flex flex-col md:flex-row gap-8 items-stretch mb-10">
            <div class="flex-1 text-slate-600 bg-slate-50 p-6 rounded-2xl flex flex-col justify-center border border-slate-100">
              <p class="text-sm leading-relaxed text-justify indent-8">
                钢丝网骨架塑料复合管是以<span class="text-brand-blue font-bold">高强度钢丝左右螺旋成型的网状骨架</span>为增强体。以高密度聚乙烯（HDPE）为基体。
              </p>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center">
              <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E9%AA%A8%E6%9E%B6%E5%A1%91%E6%96%99%EF%BC%88%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%89%E5%A4%8D%E5%90%88%E7%AE%A1%E7%BB%93%E6%9E%84%E5%9B%BE_files/1547520948256061.jpg" alt="复合管结构图" class="w-full rounded-xl shadow-sm bg-white p-2 border border-slate-100" />
            </div>
          </div>

          <h3>管材特点</h3>
          <ul class="text-sm space-y-2 mb-8">
            <li><strong>物理性能：</strong>具有超过普通塑料管的强度、刚性、抗冲击性，低线膨胀系数。</li>
            <li><strong>防腐性能：</strong>双面防腐，使用温度高，导热系数低。</li>
            <li><strong>结构整体：</strong>管材增强骨架与内外层塑料互相包容成为一个整体。</li>
            <li><strong>内壁光滑：</strong>不结垢，流阻小。</li>
            <li><strong>连接可靠：</strong>管道连接采用电热熔接头，抗轴向拉伸能力强，连接技术成熟可靠。</li>
            <li><strong>高可靠性：</strong>正常使用下寿命可达50年，综合性价比优，且卫生无毒。</li>
          </ul>

          <h3>技术要求</h3>
          <p><strong>外观颜色：</strong>一般为黑色，也可根据供需方协商决定。</p>
          <p><strong>表面质量：</strong>管材内、外表面应光泽平顺，不允许有气泡、裂口、分解变色线及明显的创伤。</p>

          <div class="bg-slate-100 p-6 rounded-2xl mb-8 border border-slate-200">
            <h3 class="mt-0">煤矿井下用复合管</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E9%AA%A8%E6%9E%B6%E5%A1%91%E6%96%99%EF%BC%88%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%89%E5%A4%8D%E5%90%88%E7%AE%A1%E7%BB%93%E6%9E%84%E5%9B%BE_files/1547522087946431.jpg" alt="煤矿规格1" class="w-full rounded-lg" />
              <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E9%AA%A8%E6%9E%B6%E5%A1%91%E6%96%99%EF%BC%88%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%89%E5%A4%8D%E5%90%88%E7%AE%A1%E7%BB%93%E6%9E%84%E5%9B%BE_files/1547522095417289.jpg" alt="煤矿规格2" class="w-full rounded-lg" />
            </div>
          </div>

          <h3>技术参数与性能指标</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E9%AA%A8%E6%9E%B6%E5%A1%91%E6%96%99%EF%BC%88%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%89%E5%A4%8D%E5%90%88%E7%AE%A1%E7%BB%93%E6%9E%84%E5%9B%BE_files/1547522061231967.jpg" alt="修正系数" class="w-full rounded-xl" />
            <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E9%92%A2%E4%B8%9D%E7%BD%91%E9%AA%A8%E6%9E%B6%E5%A1%91%E6%96%99%EF%BC%88%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%89%E5%A4%8D%E5%90%88%E7%AE%A1%E7%BB%93%E6%9E%84%E5%9B%BE_files/1547522036791695.jpg" alt="主要技术性能" class="w-full rounded-xl" />
          </div>

          <div class="mt-8 p-6 rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.02]">
            <h3 class="mt-0 text-brand-blue">双层双色复合管</h3>
            <p>采用纯原生料制造，其内壁为白色，外壁为黑色。具有更优良的复合效果 and 卫生性能。</p>
          </div>
        `
      },
      {
        title: '聚乙烯（PE）管',
        advantages: '良好的卫生性能、良好的耐腐蚀性能、长久的使用寿命、较好的耐冲击性。',
        applications: '主要用于供水、城镇燃气及工业领域。它是传统钢铁管材、聚氯乙烯饮用水管的换代产品。',
        image: 'https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%88PE%EF%BC%89%E7%AE%A1.png',
        richHTML: `
          <h3>产品简介</h3>
          <p class="text-slate-600 mb-6">PE是聚乙烯塑料，最基础的一种塑料。HDPE是一种结晶度高、非极性的热塑性树脂。给水用PE管材是传统的钢铁管材、聚氯乙烯饮用水管的换代产品。</p>

          <h3>连接与施工</h3>
          <div class="flex flex-col gap-6 mb-8">
            <div>
              <p class="text-sm leading-relaxed text-slate-600 mb-4"><strong>焊接方式：</strong>PE管道对接焊缝法具有极高的可靠性。通常通过加热管子端部迅速接触并在压力下冷却，使端部熔融为一体。</p>
              <p class="text-sm leading-relaxed text-slate-600"><strong>施工优势：</strong>相比钢管，施工工艺简单，具有一定的柔韧性且无需作防腐处理。</p>
            </div>
            <div class="w-full">
               <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%88PE%EF%BC%89%E7%AE%A1%E5%9B%BE1.jpg" alt="PE管焊接施工" class="w-full max-w-3xl mx-auto block rounded-xl shadow border border-slate-100" />
            </div>
          </div>

          <h3>分类与应用</h3>
          <p class="text-sm text-slate-600 mb-4">PE管有中密度 and 高密度之分。根据壁厚可分为SDR11 and SDR17.6系列。</p>

          <h3>规格参数</h3>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
            <p class="text-sm"><strong>压力等级：</strong>主要分为 0.6MPa (6kg), 0.8MPa, 1.0MPa, 1.25MPa, 1.6MPa。</p>
          </div>
          <img src="https://raw.githubusercontent.com/yilin20020116-lab/companyweb-images/refs/heads/main/%E4%BE%9B%E6%B0%B4%E4%BA%A7%E5%93%81/%E8%81%9A%E4%B9%99%E7%83%AF%EF%BC%88PE%EF%BC%89%E7%AE%A1%E8%A7%84%E6%A0%BC.jpg" alt="PE管规格表" class="w-full rounded-xl shadow border border-slate-100 bg-white p-2" />
        `
      }
    ]
  },
  {
    category: '排水产品',
    id: 'drainage',
    items: [
      {
        title: '低压排水用多重增强复合管',
        advantages: '管材抗内外压能力兼优，长期强度稳定，连接简便可靠，抗内外腐蚀，耐磨性强，工程造价低，性价比高。',
        applications: '市政管网、农业水利、工厂矿山供水、排水排污、综合管廊。',
        image: 'https://picsum.photos/seed/drainage1/800/600',
        richHTML: `
          <h3>产品简介</h3>
          <p>低压排水用多重增强复合管是在多重增强钢塑复合压力管技术基础上，专为低压排水、排污工况设计的管材。</p>
          <h3>产品特点</h3>
          <ul>
            <li>抗压强：复合增强结构，环刚度高。</li>
            <li>耐腐蚀：双面防腐，寿命长。</li>
            <li>施工快：重量轻，多种灵活连接方式。</li>
          </ul>
        `
      },
      {
        title: '内肋增强聚乙烯（PE）螺旋波纹管',
        advantages: '拥有优秀的耐腐蚀性，康载荷能力强，韧性好，抗地基不均匀沉降能力强，连接方便可靠。',
        applications: '市政排水、建筑工程、工业排污、农业灌溉。',
        image: 'https://picsum.photos/seed/drainage2/800/600',
        richHTML: `
          <h3>产品简介</h3>
          <p>内肋增强聚乙烯（PE）螺旋波纹管是一种纯塑料结构壁管。其独特的内肋结构大大增强了管材的径向抗压能力。</p>
        `
      },
      {
        title: '高强度聚丙烯（PP-HM）双壁波纹管',
        advantages: '高强度改性 PP-HM 材质，显著提高产品的冲击性、刚性、耐候性，无压埋地排污管系统。',
        applications: '市政雨污水排放、道路排水、居民区污水网、工业废水。',
        image: 'https://picsum.photos/seed/drainage3/800/600',
        richHTML: `
          <h3>产品简介</h3>
          <p>由高模量聚丙烯（PP-HM）制成，具有极其平滑的内壁 and 异型外壁。</p>
        `
      },
      {
        title: 'HDPE双壁波纹管',
        advantages: '抗冲抗压，耐地基不均匀沉降，摩阻低，流量大。使用寿命长达 50 年以上。',
        applications: '市政工程雨污水排放、生活区、工业园区排污。',
        image: 'https://picsum.photos/seed/drainage4/800/600',
        richHTML: `
          <h3>产品简介</h3>
          <p>HDPE双壁波纹管是以高密度聚乙烯为主要原料，内壁光滑平整，外壁呈梯形波纹状。</p>
        `
      },
      {
        title: '钢带增强聚乙烯（PE）螺旋波纹管',
        advantages: '以高密度聚乙烯为基质，钢带成型为“U”型加强筋并螺旋缠绕。兼具金属的刚性与塑料的柔性。',
        applications: '市政、工业大口径排水管线，深埋排水工程。',
        image: 'https://picsum.photos/seed/drainage5/800/600',
        richHTML: `
          <h3>产品简介</h3>
          <p>钢带增强聚乙烯（PE）螺旋波纹管将钢带的刚度与塑料的耐腐蚀性完美结合。</p>
        `
      }
    ]
  },
  {
    category: '连接件',
    id: 'accessories',
    items: [
      {
        title: '电熔直接',
        advantages: '规格参数（mm）：de50-de800。专门为钢丝网骨架、钢塑复合管道及各类 PE 管道定制设计。选用高纯度聚乙烯原材料并预埋高品质发热电阻丝。',
        applications: '给水、排水、消防系统、燃气及天然气输配管网。',
        image: 'https://picsum.photos/seed/fitting1/800/600',
        richHTML: `
          <h3>产品简介</h3>
          <p>“兴欣”牌电熔直接管件是管道系统连接的核心部件，采用优质高密度聚乙烯（HDPE）材料。</p>
        `
      },
      {
        title: '电熔异径直接',
        advantages: '规格参数（mm）：de63-de500。提供不同口径管材间的安全连接。',
        applications: '管道线路分支与延长。',
        image: 'https://picsum.photos/seed/fitting2/800/600',
      },
      {
        title: '电熔等径三通',
        advantages: '规格参数（mm）：de50-de630。',
        applications: '管道系统中的分支连接。',
        image: 'https://picsum.photos/seed/fitting3/800/600',
      },
      {
        title: '电熔异径三通',
        advantages: '规格参数（mm）：de63-de630。',
        applications: '管道转接与流量分配。',
        image: 'https://picsum.photos/seed/fitting4/800/600',
      },
      {
        title: '电熔法兰',
        advantages: '规格参数（mm）：de50-de800。',
        applications: '阀门对接连结及工业配管。',
        image: 'https://picsum.photos/seed/fitting5/800/600',
      },
      {
        title: '电熔45°弯头',
        advantages: '规格参数（mm）：de50-de630。',
        applications: '管道线路转角连接。',
        image: 'https://picsum.photos/seed/fitting6/800/600',
      },
      {
        title: '电熔90°弯头',
        advantages: '规格参数（mm）：de50-de630。',
        applications: '管道线路转角连接。',
        image: 'https://picsum.photos/seed/fitting7/800/600',
      },
      {
        title: '专业电热熔带',
        advantages: '主要用于大口径波纹管、钢带增强管的外壁连接加密。',
        applications: 'PE实壁管、钢丝网骨架增强、大口径缠绕结构管壁。',
        image: 'https://picsum.photos/seed/fitting8/800/600',
      }
    ]
  }
];
