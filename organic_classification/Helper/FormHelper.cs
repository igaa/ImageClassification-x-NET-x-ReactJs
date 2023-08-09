using organic_classification.Model;

namespace organic_classification.Helper
{
    public class FormHelper
    {
        public static string getValues(List<InitiaForm> data, string name)
        {
            string value = string.Empty;

            foreach (var item in data)
            {
                if(name == item.Name)
                {
                    value = item.Value;

                    break;
                }
            }
           
            return value;

        }
    }
}
