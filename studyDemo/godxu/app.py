class Drink:
    def __init__(self, description="未知饮品"):
        self.description = description

    def get_description(self):
        return self.description

    def cost(self):
        return 0

class GuanYinQingTea(Drink):
    def __init__(self):
        super().__init__("观音'清'茶")

    def cost(self):
        return 6

class XueDingXiaoNaiLv(Drink):
    def __init__(self):
        super().__init__("雪顶小奶绿 (八分满，奶油易化)")

    def cost(self):
        return 15

class ZhenZhuNaiCha(Drink):
    def __init__(self):
        super().__init__("珍珠奶茶")

    def cost(self):
        return 10

class DrinkDecorator(Drink):
    def __init__(self, drink):
        self.drink = drink

    def get_description(self):
        return self.drink.get_description()

    def cost(self):
        return self.drink.cost()

class TemperatureDecorator(DrinkDecorator):
    def __init__(self, drink, temperature):
        super().__init__(drink)
        self.temperature = temperature

    def get_description(self):
        return f"{self.drink.get_description()}, {self.temperature}"

    def cost(self):
        return self.drink.cost()

class AddOnDecorator(DrinkDecorator):
    def __init__(self, drink, addon, addon_cost):
        super().__init__(drink)
        self.addon = addon
        self.addon_cost = addon_cost

    def get_description(self):
        return f"{self.drink.get_description()}, {self.addon}"

    def cost(self):
        return self.drink.cost() + self.addon_cost

class SweetnessDecorator(DrinkDecorator):
    def __init__(self, drink, sweetness):
        super().__init__(drink)
        self.sweetness = sweetness

    def get_description(self):
        return f"{self.drink.get_description()}, {self.sweetness}"

    def cost(self):
        return self.drink.cost()

# 用法示例
drink = XueDingXiaoNaiLv()
drink = TemperatureDecorator(drink, "少冰")
drink = AddOnDecorator(drink, "西米", 1)
drink = SweetnessDecorator(drink, "七分糖")

print(drink.get_description())
print(f"总费用：¥{drink.cost()}")