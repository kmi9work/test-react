# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

author = Author.create! do |a|
  a.email = 'test@test.com'
  a.name = "Vasily"
  a.password = 'gfhjkm'
end

Category.create([
  { title: "Авто"},
  { title: "Здоровье"},
  { title: "Финансы"},
  { title: "Происшествия"}
])

Age.create([
  {title: "0+"},
  {title: "6+"},
  {title: "12+"},
  {title: "16+"},
  {title: "18+"}
])


Novelty.create([
  {
    title: "Российские автоконцерны выступили за повышение налога на старые машины",
    source: "РИА Новости",
    source_url: "https://ria.ru/20200221/1565049951.html",
    category: Category.find_by_title("Авто"),
    author: author,
    published_at: DateTime.now,
    text: "С поддержкой предложения *Минпромторга* о повышении транспортного налога для коммерческих автомобилей экологического класса _«Евро-3»_ и ниже выступил ряд российских автопроизводителей 21 февраля в ходе опроса, проведенного РИА Новости.",
    age: Age.find_by_title("0+")
  },
  {
    title: "Аналитики назвали средние цены на автомобили в России",
    source: "Автостат Инфо",
    source_url: "https://avtostat-info.com/News/9376",
    category: Category.find_by_title("Авто"),
    author: author,
    published_at: DateTime.now,
    text: "Средние цены новых легковых автомобилей на российском рынке в январе 2020 года назвали аналитики агентства «Автостат Инфо», 27 февраля сообщает пресс-служба организации.",
    age: Age.find_by_title("12+")
  },
  {
    title: "Жертвами схода оползня на юго-западе Китая стали четыре человека",
    source: "Синьхуа",
    source_url: "http://www.xinhuanet.com/english/2020-03/29/c_138927684.htm",
    category: Category.find_by_title("Происшествия"),
    author: author,
    published_at: DateTime.now,
    text: "Четыре человека погибли и еще трое по-прежнему числятся пропавшими без вести после схода оползня в провинции Гуйчжоу на юго-западе Китая, сообщает 29 марта агентство Синьхуа.",
    age: Age.find_by_title("12+")
  }
])