import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Dish = {
  id: number;
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  allergens: string[];
  calories: number;
  image: string;
  price: number;
};

type DayMenu = {
  day: string;
  date: string;
  dishes: Dish[];
};

const weekMenu: DayMenu[] = [
  {
    day: 'Понедельник',
    date: '18 декабря',
    dishes: [
      {
        id: 1,
        name: 'Куриная грудка с овощами',
        description: 'Сочная куриная грудка на гриле с запечёнными овощами',
        category: 'Основное блюдо',
        ingredients: ['Курица', 'Морковь', 'Брокколи', 'Перец', 'Оливковое масло'],
        allergens: [],
        calories: 320,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf88dacd-7402-4051-9979-31f538617190.jpg',
        price: 180
      },
      {
        id: 2,
        name: 'Овощной суп',
        description: 'Легкий овощной суп с зеленью и сметаной',
        category: 'Суп',
        ingredients: ['Картофель', 'Морковь', 'Капуста', 'Зелень', 'Сметана'],
        allergens: ['Лактоза'],
        calories: 150,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf061bec-8b33-448d-8c92-d92a89f108f1.jpg',
        price: 120
      },
      {
        id: 3,
        name: 'Паста с томатным соусом',
        description: 'Классическая итальянская паста с домашним томатным соусом',
        category: 'Основное блюдо',
        ingredients: ['Паста', 'Томаты', 'Базилик', 'Чеснок', 'Пармезан'],
        allergens: ['Глютен', 'Лактоза'],
        calories: 420,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/2bc61d80-f693-4e5e-a26e-e928597422aa.jpg',
        price: 160
      }
    ]
  },
  {
    day: 'Вторник',
    date: '19 декабря',
    dishes: [
      {
        id: 4,
        name: 'Рыбные котлеты',
        description: 'Нежные рыбные котлеты с картофельным пюре',
        category: 'Основное блюдо',
        ingredients: ['Рыба', 'Картофель', 'Яйцо', 'Лук', 'Сливочное масло'],
        allergens: ['Рыба', 'Яйца', 'Лактоза'],
        calories: 380,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf88dacd-7402-4051-9979-31f538617190.jpg',
        price: 190
      },
      {
        id: 5,
        name: 'Борщ с говядиной',
        description: 'Традиционный борщ с мясом говядины и сметаной',
        category: 'Суп',
        ingredients: ['Говядина', 'Свекла', 'Капуста', 'Картофель', 'Сметана'],
        allergens: ['Лактоза'],
        calories: 280,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf061bec-8b33-448d-8c92-d92a89f108f1.jpg',
        price: 140
      },
      {
        id: 6,
        name: 'Гречка с грибами',
        description: 'Гречневая каша с тушеными грибами и луком',
        category: 'Гарнир',
        ingredients: ['Гречка', 'Грибы', 'Лук', 'Морковь', 'Растительное масло'],
        allergens: [],
        calories: 240,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/2bc61d80-f693-4e5e-a26e-e928597422aa.jpg',
        price: 100
      }
    ]
  },
  {
    day: 'Среда',
    date: '20 декабря',
    dishes: [
      {
        id: 7,
        name: 'Куриный суп с лапшой',
        description: 'Домашний куриный суп с яичной лапшой',
        category: 'Суп',
        ingredients: ['Курица', 'Лапша', 'Морковь', 'Лук', 'Зелень'],
        allergens: ['Глютен', 'Яйца'],
        calories: 200,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf061bec-8b33-448d-8c92-d92a89f108f1.jpg',
        price: 130
      },
      {
        id: 8,
        name: 'Тефтели с рисом',
        description: 'Сочные мясные тефтели с отварным рисом',
        category: 'Основное блюдо',
        ingredients: ['Говядина', 'Свинина', 'Рис', 'Лук', 'Томатный соус'],
        allergens: [],
        calories: 450,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf88dacd-7402-4051-9979-31f538617190.jpg',
        price: 170
      },
      {
        id: 9,
        name: 'Салат Цезарь',
        description: 'Классический салат с курицей, сыром и соусом',
        category: 'Салат',
        ingredients: ['Курица', 'Салат', 'Пармезан', 'Сухари', 'Соус Цезарь'],
        allergens: ['Глютен', 'Лактоза', 'Яйца'],
        calories: 310,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/2bc61d80-f693-4e5e-a26e-e928597422aa.jpg',
        price: 150
      }
    ]
  },
  {
    day: 'Четверг',
    date: '21 декабря',
    dishes: [
      {
        id: 10,
        name: 'Запеченная индейка',
        description: 'Сочная индейка с овощами и травами',
        category: 'Основное блюдо',
        ingredients: ['Индейка', 'Картофель', 'Кабачок', 'Розмарин', 'Чеснок'],
        allergens: [],
        calories: 340,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf88dacd-7402-4051-9979-31f538617190.jpg',
        price: 195
      },
      {
        id: 11,
        name: 'Грибной крем-суп',
        description: 'Нежный крем-суп из шампиньонов со сливками',
        category: 'Суп',
        ingredients: ['Шампиньоны', 'Сливки', 'Лук', 'Картофель', 'Специи'],
        allergens: ['Лактоза'],
        calories: 220,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf061bec-8b33-448d-8c92-d92a89f108f1.jpg',
        price: 145
      },
      {
        id: 12,
        name: 'Овощное рагу',
        description: 'Ассорти из тушеных сезонных овощей',
        category: 'Гарнир',
        ingredients: ['Баклажаны', 'Перец', 'Помидоры', 'Кабачки', 'Лук'],
        allergens: [],
        calories: 180,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/2bc61d80-f693-4e5e-a26e-e928597422aa.jpg',
        price: 110
      }
    ]
  },
  {
    day: 'Пятница',
    date: '22 декабря',
    dishes: [
      {
        id: 13,
        name: 'Свиная отбивная',
        description: 'Сочная свиная отбивная с картофелем фри',
        category: 'Основное блюдо',
        ingredients: ['Свинина', 'Картофель', 'Яйцо', 'Панировочные сухари', 'Масло'],
        allergens: ['Глютен', 'Яйца'],
        calories: 520,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf88dacd-7402-4051-9979-31f538617190.jpg',
        price: 200
      },
      {
        id: 14,
        name: 'Щи с капустой',
        description: 'Традиционные русские щи со свежей капустой',
        category: 'Суп',
        ingredients: ['Капуста', 'Картофель', 'Морковь', 'Говядина', 'Томатная паста'],
        allergens: [],
        calories: 190,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/cf061bec-8b33-448d-8c92-d92a89f108f1.jpg',
        price: 125
      },
      {
        id: 15,
        name: 'Картофельное пюре с котлетой',
        description: 'Нежное пюре с домашней котлетой',
        category: 'Основное блюдо',
        ingredients: ['Говядина', 'Картофель', 'Молоко', 'Сливочное масло', 'Лук'],
        allergens: ['Лактоза'],
        calories: 480,
        image: 'https://cdn.poehali.dev/projects/b978b5f6-6681-42ac-a5a5-4da65a8a7afb/files/2bc61d80-f693-4e5e-a26e-e928597422aa.jpg',
        price: 175
      }
    ]
  }
];

const Index = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [likedDishes, setLikedDishes] = useState<Set<number>>(new Set());
  const [dislikedDishes, setDislikedDishes] = useState<Set<number>>(new Set());

  const handleLike = (dishId: number) => {
    const newLiked = new Set(likedDishes);
    const newDisliked = new Set(dislikedDishes);
    
    if (newLiked.has(dishId)) {
      newLiked.delete(dishId);
      toast.info('Оценка удалена');
    } else {
      newLiked.add(dishId);
      newDisliked.delete(dishId);
      toast.success('Блюдо понравилось!');
    }
    
    setLikedDishes(newLiked);
    setDislikedDishes(newDisliked);
  };

  const handleDislike = (dishId: number) => {
    const newLiked = new Set(likedDishes);
    const newDisliked = new Set(dislikedDishes);
    
    if (newDisliked.has(dishId)) {
      newDisliked.delete(dishId);
      toast.info('Оценка удалена');
    } else {
      newDisliked.add(dishId);
      newLiked.delete(dishId);
      toast.info('Спасибо за отзыв!');
    }
    
    setLikedDishes(newLiked);
    setDislikedDishes(newDisliked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white p-2 rounded-xl">
                <Icon name="UtensilsCrossed" size={32} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Умная Столовая</h1>
                <p className="text-sm text-muted-foreground">Персональное питание для школьников</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="Bell" size={18} />
              <span className="hidden sm:inline">Уведомления</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white shadow-lg animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Сегодня в меню</h2>
              <p className="text-white/90">18 декабря 2024, Понедельник</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={20} />
                <span className="font-semibold">Специальное предложение дня!</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={selectedDay.toString()} onValueChange={(v) => setSelectedDay(parseInt(v))} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto bg-white shadow-sm p-2 rounded-xl">
            {weekMenu.map((day, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">{day.day}</span>
                  <span className="text-xs opacity-80">{day.date}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {weekMenu.map((dayMenu, dayIndex) => (
            <TabsContent key={dayIndex} value={dayIndex.toString()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dayMenu.dishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2 hover:border-primary"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        <span className="font-semibold text-primary">{dish.price} ₽</span>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-secondary text-white border-0">
                        {dish.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{dish.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{dish.description}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Flame" size={16} className="text-primary" />
                          <span className="font-medium">{dish.calories} ккал</span>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-2">Состав:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {dish.ingredients.map((ingredient, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-muted">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {dish.allergens.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                            <div className="flex items-start gap-2">
                              <Icon name="AlertCircle" size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-red-700 mb-1">Аллергены:</p>
                                <p className="text-xs text-red-600">{dish.allergens.join(', ')}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          variant={likedDishes.has(dish.id) ? "default" : "outline"}
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => handleLike(dish.id)}
                        >
                          <Icon name="ThumbsUp" size={16} />
                          <span className="hidden sm:inline">Нравится</span>
                        </Button>
                        <Button
                          variant={dislikedDishes.has(dish.id) ? "destructive" : "outline"}
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => handleDislike(dish.id)}
                        >
                          <Icon name="ThumbsDown" size={16} />
                          <span className="hidden sm:inline">Не нравится</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border-2 border-accent animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="bg-accent text-accent-foreground p-3 rounded-xl">
              <Icon name="Bell" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Уведомления</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Icon name="CheckCircle" size={20} className="text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Новое меню доступно!</p>
                    <p className="text-xs text-muted-foreground">Меню на следующую неделю уже готово</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Icon name="Sparkles" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Специальное предложение!</p>
                    <p className="text-xs text-muted-foreground">Скидка 20% на комплексный обед завтра</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Умная Столовая 2.0 — Персональное питание для школьников</p>
            <p className="mt-1">Здоровое питание каждый день! 🍎</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;