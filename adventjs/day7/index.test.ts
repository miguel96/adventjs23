import { drawGift } from "./index";

describe("drawGift", () => {
  it("given size 0 and a symbol returns an empty gift", () => {
    expect(drawGift(0, "*")).toBe("\n");
  });
  it("given size one and a symbol returns a gift of 1x1", () => {
    expect(drawGift(1, "*")).toBe("#\n");
  });
  it("given size two and a symbol returns a gift of 2x2", () => {
    expect(drawGift(2, "*")).toBe(" ##\n###\n##\n");
  });

  it("given size 3 and a symbol # returns a gift of 3x3", () => {
    expect(drawGift(3, "#")).toBe("  ###\n ####\n#####\n####\n###\n");
  });

  it("given size 3 and a symbol @ returns a gift of 3x3", () => {
    expect(drawGift(3, "@")).toBe("  ###\n #@##\n###@#\n#@##\n###\n");
  });

  it("drawGift 4x4", () => {
    const gift = drawGift(4, "+");
    expect(gift).toBe(
      `   ####
  #++##
 #++#+#
####++#
#++#+#
#++##
####
`,
    );
  });
  it("drawGift 5x5", () => {
    const gift = drawGift(5, "*");
    expect(gift).toBe(
      `    #####
   #***##
  #***#*#
 #***#**#
#####***#
#***#**#
#***#*#
#***##
#####
`,
    );
  });
  it("drawGift 10x10", () => {
    const gift = drawGift(10, "%");
    expect(gift).toBe(
      `         ##########
        #%%%%%%%%##
       #%%%%%%%%#%#
      #%%%%%%%%#%%#
     #%%%%%%%%#%%%#
    #%%%%%%%%#%%%%#
   #%%%%%%%%#%%%%%#
  #%%%%%%%%#%%%%%%#
 #%%%%%%%%#%%%%%%%#
##########%%%%%%%%#
#%%%%%%%%#%%%%%%%#
#%%%%%%%%#%%%%%%#
#%%%%%%%%#%%%%%#
#%%%%%%%%#%%%%#
#%%%%%%%%#%%%#
#%%%%%%%%#%%#
#%%%%%%%%#%#
#%%%%%%%%##
##########
`,
    );
  });
});
