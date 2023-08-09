using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using organic_classification.Helper;
using organic_classification.Model;
using organic_classification.Model.API;
using organic_classification.Model.Context; 
using organic_classification.Model.Image;
using Organic_classification;
using System.Globalization;
using System.Reflection.Metadata.Ecma335;
using Tensorflow;
using Tensorflow.Contexts;

namespace organic_classification.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AnalizeController : Controller
    {
        private DbContextModel db = new DbContextModel(); 

        [HttpPost("importfile")]
        public string ImportFile([FromForm] IFormFile file)
        {
            string name = file.FileName;
            string extension = Path.GetExtension(file.FileName);

            string path = Path.Combine(Directory.GetCurrentDirectory(), "FileUpload"); 
            if(!Directory.Exists(path)) { Directory.CreateDirectory(path); }

            var filename = Guid.NewGuid().ToString() + extension;
            var filepath = Path.Combine(path, filename);
            //read the file
            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return filename; 


        }

        [HttpPost("requests")]
        public APIResponseObj Requests(List<InitiaForm> form)
        {
            using (var trans = db.Database.BeginTransaction())
            {

                try
                {

                    var id = Convert.ToInt32(FormHelper.getValues(form, "id"));
                    var getFile = db.images.Where(s => s.id == id).FirstOrDefault();
                    if (getFile != null)
                    {
                        string path = Path.Combine( Path.Combine(Directory.GetCurrentDirectory(), "FileUpload"), getFile.name);
                        var category = FormHelper.getValues(form, "category");
                        //var name = FormHelper.getValues(form, "name");

                        var trainneddataPath = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "Data"), category); 
                        if (!Directory.Exists(trainneddataPath))
                        {
                            Directory.CreateDirectory(trainneddataPath);
                        }

                        if (System.IO.File.Exists(path))
                        {
                            var filepath = Path.Combine(trainneddataPath, getFile.name);

                            if (!System.IO.File.Exists(filepath))
                            {
                                System.IO.File.Copy(path, filepath);

                                DataTraining dt = new DataTraining();
                                dt.id_image = id;
                                //dt.name = name;
                                dt.category = category;
                                dt.path = filepath;
                                db.data_training.Add(dt);
                                db.SaveChanges();

                                var image = db.images.Where(s => s.id == dt.id_image).FirstOrDefault();
                                if(image != null)
                                {
                                    image.trained = true;
                                    db.images.Update(image); 
                                    db.SaveChanges();
                                }
                                 
                            }
                        }
                        

                    }

                    trans.Commit(); 

                    return new APIResponseObj()
                    {
                        data = null,
                        message = "Success request training",
                        status = true, 
                    };

                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    return new APIResponseObj()
                    {
                        data = null,
                        message = "Failed request training",
                        status = false,
                    };

                }

            }

        }


        [HttpPost("send")]
        public MLModel.ModelOutput Send(Analize form)
        {
            using (var trans = db.Database.BeginTransaction())
            {
               

                try
                {

                    string path = Path.Combine(Directory.GetCurrentDirectory(), "FileUpload");
                    var filepath = Path.Combine(path, form.filename);

                    var response = new List<string>();
                    //Load sample data
                    var imageBytes = System.IO.File.ReadAllBytes(filepath);
                    MLModel.ModelInput sampleData = new MLModel.ModelInput()
                    {
                        ImageSource = imageBytes,
                    };

                    //Load model and predict output
                    var result = MLModel.Predict(sampleData);

                    Images img = new Images();
                    img.name = form.filename;
                    img.n_score = Decimal.Parse(result.Score[0].ToString(), NumberStyles.AllowExponent | NumberStyles.AllowDecimalPoint).ToString();
                    img.o_score = Decimal.Parse(result.Score[1].ToString(), NumberStyles.AllowExponent | NumberStyles.AllowDecimalPoint).ToString();

                    var trained =  Convert.ToDecimal(img.o_score) > 0 && Convert.ToDecimal(img.n_score) > 0 ? true : false;
                    img.label = trained ? result.PredictedLabel : "Uncategorized";
                    img.trained = false;
                    img.created_date = DateTime.Now; 
                    db.images.Add(img);
                    db.SaveChanges();

                    MLModel.ModelOutput ouputresult = new MLModel.ModelOutput();
                    ouputresult.PredictedLabel = img.label;
                    ouputresult.Label = result.Label;
                    ouputresult.ImageSource = result.ImageSource;
                    ouputresult.Score = result.Score;

                    trans.Commit();

                    return ouputresult; 

                }
                catch (Exception ex)
                {
                    trans.Rollback();

                    return new MLModel.ModelOutput() {
                        PredictedLabel = ex.Message,
                        Label = 0,
                        ImageSource = null,
                        Score = null, 

                    }; 
                }

            }
              
        }

        [HttpGet("getfileuploaded")]
        public APIResponseObj GetFileUploaded()
        {

            try
            {
                APIResponseObj result = new APIResponseObj();
                string path = Path.Combine(Directory.GetCurrentDirectory(), "FileUpload");
                //string[] arrFiles = Directory.GetFiles(path, "*.jpg", SearchOption.TopDirectoryOnly);

                var datas = db.images.Where(s => s.trained == false).OrderBy(s => s.created_date).ToList();

                List<ImagesResult> resultdata = new List<ImagesResult>();
                foreach (var item in datas)
                {
                    ImagesResult data = new ImagesResult();
                    data.filepath = item.name;
                    data.n_score = item.n_score;
                    data.o_score = item.o_score;
                    data.name = item.label;
                    data.id = item.id;
                    data.trained = item.trained;
                    data.created_date = item.created_date;
                    resultdata.Add(data);

                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                return new APIResponseObj()
                {
                    data = resultdata.OrderByDescending(s => s.created_date).ToList(),
                    message = "Success get data",
                    status = true, 
                }; 

            }
            catch (Exception)
            {

                return new APIResponseObj(); 
            }

        }
    }
}
