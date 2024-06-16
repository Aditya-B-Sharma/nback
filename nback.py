import pygame
import tkinter
app = tkinter.Tk()

BLACK = (0, 0, 0)
WHITE = (200, 200, 200)
WINDOW_HEIGHT = app.winfo_screenheight()
WINDOW_WIDTH = app.winfo_screenwidth()
print(WINDOW_HEIGHT, WINDOW_WIDTH)

def main():
    global SCREEN, CLOCK, WINDOW_HEIGHT, WINDOW_WIDTH
    pygame.init()
    pygame.display.set_caption("NBACK")
    yGridSize = int(WINDOW_HEIGHT/3)
    xGridSize = int(WINDOW_WIDTH/3)
    screenY = int(WINDOW_HEIGHT/2)
    screenX = int(WINDOW_WIDTH/3)
    SCREEN = pygame.display.set_mode((screenX, screenY))
    CLOCK = pygame.time.Clock()
    SCREEN.fill(BLACK)
    surface = pygame.Surface((100, 100))
    print(surface.get_rect()[0], surface.get_rect()[1])

    running = True

    while running:
        drawGrid(xGridSize, yGridSize)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        pygame.display.update()


def drawGrid(xGridSize, yGridSize):
    initGap = int(0.1 * xGridSize)
    mainRect = int(0.21 * xGridSize)
    midGap = int(0.08 * xGridSize)

    cx, cy = 0, 0+yGridSize/20
    rect = pygame.Rect(cx, cy, 0, 0)
    for y in range(3):
        for x in range(7):
            if x in [0, 6]:
                rect = pygame.Rect(cx, cy, initGap, yGridSize/3)
                cx = cx + initGap
                #print initgap
            elif x in [1, 3, 5]:
                rect = pygame.Rect(cx, cy, mainRect, yGridSize/3)
                cx = cx + mainRect
                    #print mainbox
            elif x in [2, 4]:
                rect = pygame.Rect(cx, cy, midGap, yGridSize/3)
                cx = cx + midGap
                    #print mid Gap
            if x not in [1, 3, 5]:
                pygame.draw.rect(SCREEN, BLACK, rect, 1)
            else:
                pygame.draw.rect(SCREEN, WHITE, rect, 1)
               # y = y + (yGridSize/3)
        cx = 0
        cy = cy + yGridSize/3 + yGridSize/20

if __name__ == "__main__":
    main()
